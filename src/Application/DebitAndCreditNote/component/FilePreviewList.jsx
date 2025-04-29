const FilePreviewList = ({ files = [], title, handleViewImage, handleFileDelete, fileType }) => {
    if (!files.length) return null; // Return null if no files are present

    return (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <p className="text-base font-medium mb-2">Uploaded {title}</p>
            {files.map((file, index) => (
                <div key={index} className="mb-4">
                    <img
                        src={file ? URL.createObjectURL(file) : ""}
                        alt={`${title} Uploaded Preview`}
                        className="h-32 w-32 object-cover rounded-md"
                    />
                    <div>
                        <button
                            onClick={(event) => handleViewImage(file, event)}
                            className="mt-2 text-green-500 hover:text-green-700 text-sm mr-5"
                        >
                            View
                        </button>
                        <button
                            onClick={() => handleFileDelete(fileType, file)}
                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilePreviewList;
