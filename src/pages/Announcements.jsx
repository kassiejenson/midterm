import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useAnnouncements } from '../context/AnnouncementsProvider.jsx';
import Card from '../components/common/Card.jsx';
import Button from '../components/common/Button.jsx';


const Announcements = () => {
    const { userInfo } = useAuth();
    const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddAnnouncement = () => {
        console.log('user info announce', userInfo)
        if (newTitle.trim() === '') return;

        if (editIndex !== null) {
            const updatedAnnouncement = { title: newTitle, content: newContent };
            updateAnnouncement(editIndex, updatedAnnouncement);
            setEditIndex(null);
        } else {
            addAnnouncement({ title: newTitle, content: newContent });
        }

        setNewTitle('');
        setNewContent('');
    };

    const handleEditAnnouncement = (index) => {
        setNewTitle(announcements[index].title);
        setNewContent(announcements[index].content)
        setEditIndex(index);
    };

    const handleDeleteAnnouncement = (index) => {
        deleteAnnouncement(index);
    };

    return (
        <div>
            <h1>Announcements</h1>
            {userInfo.isTeacher && (
                <div>
                    <h2>Create Announcement</h2>
                    <Card>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            placeholder="Announcement Content"
                        />
                        <Button onClick={handleAddAnnouncement}>
                            {editIndex !== null ? 'Update Announcement' : 'Create Announcement'}
                        </Button>
                    </Card>
                </div>
            )}

            {announcements.map((announcement, index) => (
                <Card key={index} title={announcement.title}>
                    <div>
                        <p>{announcement.content}</p>
                        {userInfo.isTeacher && (
                            <div>
                                <Button onClick={() => handleEditAnnouncement(index)}>Edit</Button>
                                <Button onClick={() => handleDeleteAnnouncement(index)}>Delete</Button>
                            </div>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Announcements;