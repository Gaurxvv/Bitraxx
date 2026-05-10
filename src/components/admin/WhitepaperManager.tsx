'use client'

import { useState } from 'react'
import { uploadWhitepaper } from '@/lib/admin-actions'
import { FileText, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function WhitepaperManager() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setStatus(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const result = await uploadWhitepaper(formData)
      if (result.success) {
        setStatus({ type: 'success', message: 'Institutional Whitepaper updated successfully.' })
        setFile(null)
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to update protocol document.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An unexpected error occurred during transmission.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 rounded-[2rem] bg-black border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all duration-700">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif text-white italic">Protocol Documentation</h3>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Managed Asset: whitepaper.pdf</p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="whitepaper-upload"
            />
            <label
              htmlFor="whitepaper-upload"
              className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-pointer group/label"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-slate-500 group-hover/label:text-primary transition-colors mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/label:text-slate-200 transition-colors">
                  {file ? file.name : 'Upload New Whitepaper (PDF)'}
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-4 rounded-xl bg-primary text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed gold-gradient"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing Protocol...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Update Asset
              </>
            )}
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <p className="text-[10px] font-bold uppercase tracking-[0.1em]">{status.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
