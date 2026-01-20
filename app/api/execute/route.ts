import { NextRequest, NextResponse } from 'next/server'

// Language mapping: Our IDs -> Piston language names
const LANGUAGE_MAP: Record<number, string> = {
    71: 'python',      // Python 3
    63: 'javascript',  // JavaScript (Node.js)
}

export async function POST(request: NextRequest) {
    try {
        const { source_code, language_id, stdin } = await request.json()

        if (!source_code) {
            return NextResponse.json(
                { error: 'source_code is required' },
                { status: 400 }
            )
        }

        if (!language_id) {
            return NextResponse.json(
                { error: 'language_id is required' },
                { status: 400 }
            )
        }

        const language = LANGUAGE_MAP[language_id]
        if (!language) {
            return NextResponse.json(
                { error: `Unsupported language_id: ${language_id}` },
                { status: 400 }
            )
        }

        // Execute with Piston
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language,
                version: '*', // Use latest version
                files: [
                    {
                        name: language === 'python' ? 'main.py' : 'main.js',
                        content: source_code,
                    },
                ],
                stdin: stdin || '',
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Piston API error: ${response.status} - ${errorText}`)
        }

        const result = await response.json()

        // Transform Piston response to match Judge0 format (for compatibility)
        const transformed = {
            stdout: result.run.stdout || '',
            stderr: result.run.stderr || '',
            status: {
                id: result.run.code === 0 ? 3 : 6, // 3 = Accepted, 6 = Runtime Error
                description: result.run.code === 0 ? 'Accepted' : 'Runtime Error',
            },
            time: null, // Piston doesn't return execution time
            memory: null,
        }

        return NextResponse.json(transformed)
    } catch (error: any) {
        console.error('Execute error:', error)
        return NextResponse.json(
            { error: error.message || 'Execution failed' },
            { status: 500 }
        )
    }
}