import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); //-1 will sort in desc. order (newest first)
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        if (!notes) return res.status(404).json({message: "Note not found"});
        res.json(notes);
    } catch (error) {
        console.log("Error in getNoteById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content}); //title n content user passes
       
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error in createNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
   try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content}, 
            {
                new: true,
            }
        );
        if (!updateNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message:"Note updated successfully!", updateNote})
    } catch (error) {
       console.log("Error in updateNote controller:", error);
       res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
       console.log("Error in updateNote controller:", error);
       res.status(500).json({ message: "Internal server error" });
    }
}
// 