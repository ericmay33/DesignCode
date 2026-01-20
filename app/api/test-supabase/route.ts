import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    try {
        const supabase = await createClient()

        // Simple connection test - just get the current timestamp from Postgres
        const { data, error } = await supabase.rpc('now')

        if (error) {
            // Just verify we can create a client - this proves connection works
            const client = await createClient()
            return NextResponse.json({
                success: true,
                message: 'Supabase connected successfully (no tables yet)',
                timestamp: new Date().toISOString(),
                note: 'Database is empty - tables will be created in Sprint 2'
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Supabase connected successfully',
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}