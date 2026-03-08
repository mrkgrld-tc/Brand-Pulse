import { read, utils } from 'xlsx'
export const readCsv = (file)=>{
    return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      // Step 1: Read the file buffer
      const workbook = read(e.target.result, { type: 'binary', cellDates: true })

      // Step 2: Get the first sheet
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Step 3: Convert sheet to JSON (headers become keys automatically)
      const json = utils.sheet_to_json(worksheet).map(row => ({
        ...row,
        Date: new Date(row.Date).toLocaleDateString('en-US') // "3/6/2026"
        }))

      resolve(json)
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsBinaryString(file)
  })
}