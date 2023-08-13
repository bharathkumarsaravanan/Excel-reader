import React, { useState } from "react";
import Excel from "exceljs";

export default function Home() {

    const [fileData, setFileData] = useState([]); 
    const [tabVisible, setTabVisible] = useState(false);
    const getFile = (e) => {
        const file = e.target.files[0];
        const wb = new Excel.Workbook();
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const buffer = reader.result;
            wb.xlsx.load(buffer).then((workbook) => {
                workbook.eachSheet((sheet, id) => {
                    if (sheet.name == "Athletes") {
                        sheet.eachRow((row, rowIndex) => {
                            if (rowIndex > 3) {
                                    var rowAr = Array.from(row.values);
                                    setFileData(prev => {
                                        return [...prev, rowAr]
                                    })
                            }
                        });
                    }
                });
            })
        };
    }

    return (
        <React.Fragment>
            <form>
                <input 
                    type="file" 
                    id="file" 
                    name="file"
                    onChange={(data) => getFile(data)}
                    />
            </form>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fileData && fileData.map((row, rowIndex) => {
                            if (rowIndex > 3) {
                                return (
                                    <tr key={rowIndex}>
                                        <td>{row[1]}</td>
                                        <td>{row[3]}</td>
                                    </tr>
                                )
                            }

                        })}
                    </tbody>
            </table>
        </React.Fragment>

    )
}