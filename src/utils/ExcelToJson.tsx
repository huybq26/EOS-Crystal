import * as XLSX from "xlsx";


export async function excelToJson(excelFile: File) {

    const csv = await getCSVfromFile(excelFile);
    const data = convertCSVtoJson(csv);

    return data[0];
}

async function getCSVfromFile(excelFile: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(excelFile);

        reader.onload = (event) => {
            const bstr = event.target?.result;
            const workbook = XLSX.read(bstr, { type: "binary" });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            resolve(csv);
        };

        reader.onerror = (err) => {
            reject(err);
        };
    });
}

function convertCSVtoJson(csv: String) {
    let lines = csv.split("\n")
    let json = [];
    let headers = lines[0].split(",");

    let common: { [key: string]: any } = {};
    let firstLine = lines[1].split(",")
    for (let i = 0; i < 8; i++) {
        common[headers[i]] = firstLine[i];
    }
    json.push(common);
    json[0]["traverse"] = [];

    for (let i = 1; i < lines.length; i++) {
        let obj: { [key: string]: any } = {};
        let currentline = lines[i].split(",");

        for (let j = 8; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        json[0]["traverse"].push(obj);
    }

    return json;
}