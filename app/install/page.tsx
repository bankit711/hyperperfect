"use client"

export default function InstallPage() {
  return (
    <div className="font-sans text-gray-800 max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Install HyperPerfect Excel Add-in</h1>
      
      <p className="mb-6">Click the button below to install the HyperPerfect add-in for Microsoft Excel:</p>
      
      <a 
        href="ms-excel:ofe|u|https://hyperperfect.ai/assets/manifest.xml" 
        className="install-button inline-block bg-[#1a7bff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1666db] transition-colors"
      >
        Install HyperPerfect Add-in
      </a>
      
      <div className="mt-8 p-5 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-3">Manual Installation</h3>
        <p className="mb-4">If the automatic installation doesn't work, you can install the add-in manually:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open Microsoft Excel</li>
          <li>Go to the "Insert" tab</li>
          <li>Click "Office Add-ins"</li>
          <li>Select "Upload My Add-in"</li>
          <li>Enter this URL: <code className="bg-gray-200 px-1 py-0.5 rounded">https://hyperperfect.ai/assets/manifest.xml</code></li>
        </ol>
      </div>
    </div>
  )
}
