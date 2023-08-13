import React, { useState } from "react";
import Excel from "exceljs";

export default function Home() {

    const [fileData, setFileData] = useState({}); 

    const getFile = (e) => {
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            wb.xlsx.load(buffer).then((workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row, rowIndex) => {
                        console.log(row.values, rowIndex);
                    });
                });
            });
        };
    }

    return (
        <form>
            <input 
                type="file" 
                id="file" 
                name="file"
                onChange={(data) => getFile(data)}
                 />
        </form>
    )
}