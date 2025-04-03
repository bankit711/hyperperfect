"use client"

export default function InstallPage() {
  return (
    <div className="font-sans text-gray-800 max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">Install HyperPerfect Excel Add-in</h1>
      

      {/* 
      <p className="mb-6">Click the button below to install the HyperPerfect add-in for Microsoft Excel:</p>
      
      <a 
        href="ms-excel:ofe|u|https://hyperperfect-prod.azurewebsites.net/manifest.xml" 
        className="install-button inline-block bg-[#1a7bff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1666db] transition-colors"
        download="manifest.xml"
      >
        Install HyperPerfect Add-in
      </a>
      */}
      
      <div className="mt-8 p-5 bg-gray-100 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Installing HyperPerfect on Windows</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 1: Create and Share a Folder</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open <strong>File Explorer</strong> and navigate to the parent folder or drive where you want to create your shared folder.</li>
            <li>Create a new folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">C:\ExcelAddins</code>).</li>
            <li>Right-click the folder and select <strong>Properties</strong>.</li>
            <li>Go to the <strong>Sharing</strong> tab and click <strong>Share</strong>.</li>
            <li>In the <strong>Network access</strong> dialog, add yourself and any other users/groups with whom you want to share the folder. Ensure they have at least <strong>Read/Write</strong> permissions.</li>
            <li>Click <strong>Share</strong>, then note the full network path displayed (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">\\YourComputerName\ExcelAddins</code>). You will need this path later.</li>
            <li>Click <strong>Done</strong>, then close the <strong>Properties</strong> dialog.</li>
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 2: Configure the Shared Folder as a Trusted Catalog</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open Excel and create a new blank workbook.</li>
            <li>Go to <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Trust Center</strong> &gt; <strong>Trust Center Settings</strong>.</li>
            <li>Select <strong>Trusted Add-in Catalogs</strong>.</li>
            <li>In the <strong>Catalog Url</strong> box, enter the full network path of the shared folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">\\YourComputerName\ExcelAddins</code>).</li>
            <li>Click <strong>Add catalog</strong>, then check the box for <strong>Show in Menu</strong>.</li>
            <li>Click <strong>OK</strong> to close all dialog boxes.</li>
            <li>Restart Excel for changes to take effect.</li>
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 3: Sideload Your Add-in</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Download your add-in manifest XML file into the shared folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">C:\ExcelAddins</code>):
              <div className="mt-2 mb-2">
                <a 
                  href="https://hyperperfect-prod.azurewebsites.net/manifest.xml" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#1a7bff] text-white px-4 py-2 rounded font-medium hover:bg-[#1666db] transition-colors"
                >
                  Download Manifest File
                </a>
              </div>
            </li>
            <li>Open Excel and go to <strong>Insert</strong> &gt; <strong>My Add-ins</strong> &gt; <strong>Shared Folder</strong> in the ribbon.</li>
            <li>Select your add-in from the list and click <strong>Add</strong> to load it.</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p>If you encounter issues, verify that your shared folder is correctly configured as a trusted catalog and that Excel has been restarted after changes.</p>
        </div>
      </div>
    </div>
  )
}
