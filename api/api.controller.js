const {
    storeFile,
    getFiles,
    getFileByID
} = require('./api.service');
const fs = require("fs");
module.exports = {
    storeFile: async (req, res) => {
        try {
            const server_file_name = req.file.filename;
            const file_name = req.file.originalname;
            console.log("file_name", file_name);
            console.log("server_file_name", server_file_name);

            await storeFile(file_name, server_file_name);

            return res.json({
                status: 200,
                message: "File stored successfully",
                file_name: file_name,
                server_file_name: server_file_name
            });
        }
        catch (e) {
            console.log("error", e)
            res.json({
                status: 500,
                message: 'Something went wrong',
                error: e
            });
        }
    },
    getFiles: async (req, res) => {
        try {
            const documents = await getFiles();

            return res.json({
                status: 200,
                data: documents
            });
        }
        catch (e) {
            console.log("error", e)
            res.json({
                status: 500,
                message: 'Something went wrong',
                error: e
            });
        }
    },
    LoadFile: async (req, res) => {
        try {
            const { file_id } = req.body;
            const document = await getFileByID(file_id);

            fs.access(__dirname+'/documents/'+document[0].server_file_name, fs.constants.F_OK, async (err) => {
                if (err) {
                    console.error('File does not exist');
                    return res.json({
                        status: 404,
                        message: "File do not exist",
                        filename: document[0].file_name
                    });
                }

                res.setHeader('Content-Type', 'application/blob');
                res.setHeader('File-Name', `${document[0].file_name.toString()}`);
                res.setHeader('Access-Control-Expose-Headers', 'File-Name');
                const stream = fs.createReadStream(__dirname+'/documents/'+document[0].server_file_name);
                stream.pipe(res);
            });
        }
        catch (e) {
            console.log("error", e)
            res.json({
                status: 500,
                message: 'Something went wrong',
                error: e
            });
        }
    },
}