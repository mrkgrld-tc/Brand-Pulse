import { utils, writeFile } from 'xlsx'
export const generateCsv = async ()=>{
    const template = [
        {
            Date : '2026-03-06 (mm/dd/yyyy)',
            Feedback : 'Service is good'
        }
    ];
    try {
        const worksheet = utils.json_to_sheet(template);
    
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Feedback');
    
        writeFile(workbook, 'feedback.csv')
        return true
    } catch (error) {
        console.log('generate csv', error);
        return false;
    }
}