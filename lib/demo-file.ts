// This is a helper function to create and download a demo file
export function downloadDemoFile(productName: string) {
  // Create a simple text content for the demo file
  const content = `
DevMarket - Demo File
Product: ${productName}
Date: ${new Date().toLocaleDateString()}

This is a demo file for ${productName}. In a real application, this would be the actual product file.

Thank you for trying DevMarket!
`

  // Create a Blob with the content
  const blob = new Blob([content], { type: "text/plain" })

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob)

  // Create a temporary anchor element
  const a = document.createElement("a")
  a.href = url
  a.download = `${productName.toLowerCase().replace(/\s+/g, "-")}-demo.txt`

  // Trigger the download
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
