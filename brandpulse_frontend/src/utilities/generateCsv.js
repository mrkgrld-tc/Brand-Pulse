import { utils, writeFile } from 'xlsx'
export const generateCsv = async ()=>{
    const template = [
        {
            Date : 'mm-dd-yyyy',
            Feedback : 'Your feedback here',
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