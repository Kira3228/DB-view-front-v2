export interface IDownloadOptions {
    filename?: string
}


export const downloadBlob = (blob: Blob, options: IDownloadOptions = {}) => {
    const { filename = `report.csv` } = options

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement(`a`)
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url);
}