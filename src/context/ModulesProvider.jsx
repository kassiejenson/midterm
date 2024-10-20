import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ModulesContext = createContext();

export const ModulesProvider = ({ children }) => {
    const [modules, setModules] = useState(() => {
        return JSON.parse(localStorage.getItem('modules')) || [];
    });

    useEffect(() => {
        localStorage.setItem('modules', JSON.stringify(modules))
    }, [modules]);

    const createModule = (title) => {
        const newModule = {
            id: uuidv4(),
            title: title,
            isPublished: false,
            pageIds: [],
        };
        setModules(prevModules => [...prevModules, newModule]);
    };

    const toggleModulePublish = (moduleId) => {
        setModules(prevModules => prevModules.map(module => module.id === moduleId ? { ...module, isPublished: !module.isPublished } : module))
    };

    const editModuleTitle = (moduleId, newTitle) => {
        setModules(prevModules => prevModules.map(module => module.id === moduleId ? { ...module, title: newTitle } : module))
    }

    const deleteModule = (moduleId) => {
        setModules(prevModules => prevModules.filter(module => module.id !== moduleId))
    }

    const addPageToModule = (moduleId, pageId) => {
        setModules(prevModules => prevModules.map(module => module.id === moduleId ? { ...module, pageIds: [...module.pageIds, pageId] } : module))
    }

    const deletePageFromModule = (moduleId, pageId) => {
        setModules(prevModules => prevModules.map(module => module.id === moduleId ? { ...module, pageIds: module.pageIds.filter(id => id !== pageId) } : module))
    }


    return (
        <ModulesContext.Provider value={{ modules, createModule, toggleModulePublish, editModuleTitle, deleteModule, addPageToModule, deletePageFromModule }}>
            {children}
        </ModulesContext.Provider>
    );
};

