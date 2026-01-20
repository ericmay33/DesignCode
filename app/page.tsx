"use client";

import { useState } from "react";

export default function Home() {
	const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	async function testSupabase() {
		setLoading(true);
		try {
			const response = await fetch("/api/test-supabase");
			const data = await response.json();
			setSupabaseStatus(data);
		} catch (error) {
			setSupabaseStatus({ success: false, error: "Failed to connect" });
		}
		setLoading(false);
	}

	return (
		<main className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-2">DesignCode</h1>
				<p className="text-gray-600 mb-8">Design it. Code it. Ship it.</p>

				<div className="bg-gray-50 p-6 rounded-lg mb-6">
					<h2 className="text-xl font-semibold mb-4">Sprint 0 Setup</h2>
					<div className="space-y-2 text-sm">
						<p>✅ Next.js 14 + TypeScript</p>
						<p>✅ Tailwind CSS</p>
						<p>✅ Supabase Connected</p>
						<p>⏳ Judge0 (next)</p>
						<p>⏳ Vercel Deploy (next)</p>
					</div>
				</div>

				<div className="space-y-4">
					<button
						onClick={testSupabase}
						disabled={loading}
						className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Testing..." : "Test Supabase Connection"}
					</button>

					{supabaseStatus && (
						<div
							className={`p-4 rounded-lg ${supabaseStatus.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
						>
							<pre className="text-sm overflow-auto">
								{JSON.stringify(supabaseStatus, null, 2)}
							</pre>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}