import React, { useState } from "react";
import Excel from "exceljs";
import emailjs from '@emailjs/browser';

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
                        sheet.eachRow((row, rowIndex) => {
                            if (rowIndex > 1) {
                                    var rowAr = Array.from(row.values);
                                    setFileData(prev => {
                                        return [...prev, rowAr]
                                    })
                            }
                        });
                });
            })
        };
    }

    const sendMail = (to) => {

        const user = fileData.find((data, index) => index == to);

        if (user[2] && user[3] && user[12]) {
            emailjs.send('service_8t1dg84', 
                        'template_olakybd', 
                        {
                            from_name: "cts alert",
                            to_name: user[2],
                            message: user[3],
                            to_mail: user[12],
                        }, 
                        '2ivqwepktUEzNazVV')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }


    }

    return (
        <React.Fragment>
            <form>
                <input 
                    type="file" 
                    id="file" 
                    name="file"
                    disabled={fileData.length!=0}
                    onChange={(data) => getFile(data)}
                    />
            </form>
                <table hidden={!fileData.length!=0}>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fileData && fileData.map((row, rowIndex) => {
                                return (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex + 1 + " ."}</td>
                                        <td>{row[2]}</td>
                                        <td>{row[12]}</td>
                                        <td><button onClick={() => sendMail(rowIndex)}>Send mail</button></td>
                                    </tr>
                                )
                            

                        })}
                    </tbody>
            </table>
        </React.Fragment>

    )
}