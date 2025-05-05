/*
/*
"use client"

export default function InstallPage() {
  const handleDownload = async () => {
    try {
      const response = await fetch('https://hyperperfect-prod.azurewebsites.net/manifest.xml');
      const text = await response.text();
      
      // Create a Blob from the XML text
      const blob = new Blob([text], { type: 'application/xml' });
      
      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'manifest.xml';
      
      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Release the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading manifest file:', error);
      alert('There was an error downloading the manifest file. Please try again.');
    }
  };
  return (
    <div className="font-sans text-gray-800 max-w-3xl mx-auto px-5 py-10 relative">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <a 
          href="/" 
          className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded font-medium hover:bg-gray-300 transition-colors text-sm"
        >
          Return to HyperPerfect
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-6">Install HyperPerfect Excel Add-in</h1>
      
      <div className="mt-8 p-5 bg-gray-100 rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Installing HyperPerfect on Windows</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 1: Create and Share a Folder</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open <strong>File Explorer</strong> and navigate to the parent folder or drive where you want to create your shared folder.</li>
            <li>Create a new folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">C:\HyperPerfect_Folder</code>).</li>
            <li>Right-click the folder and select <strong>Properties</strong>.</li>
            <li>Go to the <strong>Sharing</strong> tab and click <strong>Share</strong>.</li>
            <li>In the <strong>Network access</strong> dialog, use the dropdown menu to add yourself to share the folder.</li>
            <li>Click <strong>Share</strong>, then Click <strong>Done</strong>.</li>
            <li>Then copy the full network path displayed (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">\\YourComputerName\HyperPerfect_Folder</code>).</li>
            <li>Click <strong>Close</strong>.</li>
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 2: Configure the Shared Folder as a Trusted Catalog</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open any Excel workbook.</li>
            <li>Go to <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Trust Center</strong> &gt; <strong>Trust Center Settings</strong>.</li>
            <li>Select <strong>Trusted Add-in Catalogs</strong>.</li>
            <li>In the <strong>Catalog Url</strong> box, paste the full network path of the shared folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">\\YourComputerName\HyperPerfect_Folder</code>).</li>
            <li>Click <strong>Add catalog</strong>.</li>
            <li>IMPORTANT: Before closing, check the <strong>Show in Menu</strong> box.</li>
            <li>Click <strong>OK</strong> to close all dialog boxes.</li>
            <li>Restart Excel for changes to take effect.</li>
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Step 3: Sideload Your Add-in</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Download your add-in manifest XML file into the shared folder (e.g., <code className="bg-gray-200 px-1 py-0.5 rounded">C:\HyperPerfect_Folder</code>):
              <div className="mt-2 mb-2">
                <button 
                  onClick={async () => {
                    try {
                      const response = await fetch('https://hyperperfect-prod.azurewebsites.net/manifest.xml');
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'manifest.xml';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Download failed:', error);
                      alert('Failed to download manifest file. Please try again.');
                    }
                  }}
                  className="inline-block bg-[#1a7bff] text-white px-4 py-2 rounded font-medium hover:bg-[#1666db] transition-colors"
                >
                  Download Manifest File
                </button>
              </div>
            </li>
            <li>Open Excel and go to <strong>Home Ribbon</strong> &gt; <strong>Add-ins</strong>  <strong>More Add-ins</strong> &gt; <strong>Shared Folder</strong>.</li>
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
*/
