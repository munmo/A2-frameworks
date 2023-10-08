module.exports = function (app, formidable, fs, path) {
    // Route to manage image file uploads
    app.post('/api/uploads', (req, res) => {
        console.log("upload route accessed");
        var form = new formidable.IncomingForm();
        const uploadFolder = path.join(__dirname, "../userimages");
        form.uploadDir = uploadFolder;
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            // Log the 'files' object here to inspect its structure
            console.log(files);

            // Assuming a single file for this example.
            if (!files || !files.image || !files.image[0].filepath) {
                return res.status(400).json({
                    status: "Fail",
                    message: "No image was uploaded or there was an error in processing the image."
                });
            }

            let oldpath = files.image[0].filepath;
            let newpath = form.uploadDir + "/" + files.image[0].originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    console.log("Error parsing the files");
                    return res.status(400).json({
                        status: "Fail",
                        message: "There was an error parsing the files",
                        error: err,
                    });
                }

                // Construct the image path relative to your server's URL
                const imagePath = `/userimages/${files.image[0].originalFilename}`;

                // Send the result to the client if all is good, including the image path
                res.send({
                    result: 'OK',
                    data: { 'filename': files.image[0].originalFilename, 'size': files.image[0].size },
                    numberOfImages: 1,
                    message: 'upload successful',
                    imagePath: imagePath // Include the image path in the response
                });
            });
        });
    });
}
