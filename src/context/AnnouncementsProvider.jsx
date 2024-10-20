import { createContext, useContext, useState, useEffect } from 'react';

const AnnouncementsContext = createContext();

export const AnnouncementsProvider = ({ children}) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
        setAnnouncements(storedAnnouncements);
    }, []);

    useEffect(() => {
        localStorage.setItem('announcements', JSON.stringify(announcements))
    }, [announcements])

    const addAnnouncement = (announcement) => {
        setAnnouncements((prev) => [...prev, announcement]);
    };

    const updateAnnouncement = (index, updatedAnnouncement) => {
        setAnnouncements((prev) => prev.map((ann, i) => (i === index ? updatedAnnouncement : ann)))
    };

    const deleteAnnouncement = (index) => {
        setAnnouncements((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <AnnouncementsContext.Provider value={{ announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement}}>
            {children}
        </AnnouncementsContext.Provider>
    );
};

export const useAnnouncements = () => {
    return useContext(AnnouncementsContext);
}

