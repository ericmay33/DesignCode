'use client'

import { useState } from 'react'

export default function Home() {
	const [supabaseStatus, setSupabaseStatus] = useState<any>(null)
	const [pistonStatus, setPistonStatus] = useState<any>(null)
	const [loading, setLoading] = useState({ supabase: false, piston: false })

	async function testSupabase() {
		setLoading(prev => ({ ...prev, supabase: true }))
		try {
			const response = await fetch('/api/test-supabase')
			const data = await response.json()
			setSupabaseStatus(data)
		} catch (error) {
			setSupabaseStatus({ success: false, error: 'Failed to connect' })
		}
		setLoading(prev => ({ ...prev, supabase: false }))
	}

	async function testPython() {
		setLoading(prev => ({ ...prev, piston: true }))
		try {
			const response = await fetch('/api/execute', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					source_code: 'print("Hello from Python!")',
					language_id: 71, // Python 3
				}),
			})
			const data = await response.json()
			setPistonStatus(data)
		} catch (error) {
			setPistonStatus({ error: 'Failed to execute' })
		}
		setLoading(prev => ({ ...prev, piston: false }))
	}

	async function testJavaScript() {
		setLoading(prev => ({ ...prev, piston: true }))
		try {
			const response = await fetch('/api/execute', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					source_code: 'console.log("Hello from JavaScript!");',
					language_id: 63, // JavaScript (Node.js)
				}),
			})
			const data = await response.json()
			setPistonStatus(data)
		} catch (error) {
			setPistonStatus({ error: 'Failed to execute' })
		}
		setLoading(prev => ({ ...prev, piston: false }))
	}

	return (
		<main className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">DesignCode</h1>
				<p className="text-gray-600 mb-8">Design it. Code it. Ship it.</p>

				<div className="bg-gray-50 p-6 rounded-lg mb-6">
					<h2 className="text-xl font-semibold mb-4">Sprint 0 Setup ✅</h2>
					<div className="space-y-2 text-sm">
						<p>✅ Next.js 14 + TypeScript</p>
						<p>✅ Tailwind CSS</p>
						<p>✅ Supabase Connected</p>
						<p>✅ Piston Execution Engine (Python & JavaScript)</p>
						<p>✅ Deployed to Vercel</p>
						<p>✅ Auto-deploy on git push</p>
					</div>
					<div className="mt-4 pt-4 border-t border-gray-200">
						<p className="text-sm font-semibold text-green-600">
						🎉 Infrastructure Complete - Ready for Test Harness!
						</p>
					</div>
				</div>

				<div className="space-y-6">
					{/* Supabase Test */}
					<div>
						<h3 className="font-semibold mb-2">Test Supabase</h3>
						<button
							onClick={testSupabase}
							disabled={loading.supabase}
							className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading.supabase ? 'Testing...' : 'Test Supabase Connection'}
						</button>

						{supabaseStatus && (
							<div className={`mt-3 p-4 rounded-lg ${supabaseStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
								<pre className="text-sm overflow-auto">
									{JSON.stringify(supabaseStatus, null, 2)}
								</pre>
							</div>
						)}
					</div>

					{/* Piston Test */}
					<div>
						<h3 className="font-semibold mb-2">Test Piston</h3>
						<div className="flex gap-2">
							<button
								onClick={testPython}
								disabled={loading.piston}
								className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading.piston ? 'Executing...' : 'Execute Python'}
							</button>
							<button
								onClick={testJavaScript}
								disabled={loading.piston}
								className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading.piston ? 'Executing...' : 'Execute JavaScript'}
							</button>
						</div>

						{pistonStatus && (
							<div className={`mt-3 p-4 rounded-lg ${pistonStatus.stdout ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
								<pre className="text-sm overflow-auto">
									{JSON.stringify(pistonStatus, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}