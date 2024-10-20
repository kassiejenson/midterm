import { useState, useEffect } from 'react';
import { useModules } from '../hooks/useModules.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import Button from '../components/common/Button.jsx';
import { Link } from 'react-router-dom';

const Modules = () => {
    const { userInfo } = useAuth();
    const { modules, createModule, toggleModulePublish, editModuleTitle, deleteModule, addPageToModule, deletePageFromModule } = useModules();
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [editingModule, setEditingModule] = useState(null);
    const [newPageTitle, setNewPageTitle] = useState('');
    const [availablePages, setAvailablePages] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState('');

    useEffect(() => {
        const pages = JSON.parse(localStorage.getItem('pages')) || [];
        setAvailablePages(pages);
    }, [])

    const saveModule = () => {
        if (editingModule) {
            editModuleTitle(editingModule.id, newModuleTitle);
            setEditingModule(null);
            setNewModuleTitle('');
        }
    };

    const handleCreateModule = () => {
        if (!newModuleTitle.trim()) {
            alert("you must include a title");
            return;
        }
        createModule(newModuleTitle);
        setNewModuleTitle('');
    }

    const handleAddPage = (moduleId) => {
        if (!selectedPageId) {
            alert("select a page to add")
            return;
        }
        addPageToModule(moduleId, selectedPageId);
        setSelectedPageId('');
    }



    return (
        <div className="modules">
            <h1>Modules</h1>
            {userInfo.isTeacher && (
                <>
                    <label>Module Title</label>
                    <input
                        type="text"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                    />
                    <Button onClick={handleCreateModule}>Create Module</Button>
                </>
            )}

            {modules.map(module => (
                <div key={module.id}>
                    {userInfo.isTeacher || module.isPublished ? ( 
                        <>
                            <h2>{module.title} {module.isPublished ? '(Published)' : '(Unpublished)'}</h2>
                            {userInfo.isTeacher && (  
                                <>
                                    <Button onClick={() => toggleModulePublish(module.id)}>
                                        {module.isPublished ? 'Unpublish' : 'Publish'}
                                    </Button>
                                    <Button onClick={() => { setEditingModule(module); setNewModuleTitle(module.title); }}>Edit</Button>
                                    <Button onClick={() => deleteModule(module.id)}>Delete</Button>

                                    <select value={selectedPageId} onChange={(e) => setSelectedPageId(e.target.value)}>
                                        <option value="">Select a page</option>
                                        {availablePages.map(page => (
                                            <option key={page.id} value={page.id}>
                                                {page.title}
                                            </option>
                                        ))}
                                    </select>
                                    <Button onClick={() => handleAddPage(module.id)}>Add Page</Button>
                                </>
                            )}

                            <div>
                                {module.pageIds && module.pageIds.map(pageId => {
                                    const page = availablePages.find(p => p.id === pageId);
                                    return (
                                        <div key={pageId}>
                                            {page ? (
                                                <Link to={`/pages/${page.id}`}><h4>{page.title}</h4></Link>
                                            ) : (
                                                <h4>Page not found</h4>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}

            {editingModule && (
                <div>
                    <h3>Edit Module</h3>
                    <input
                        type="text"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                    />
                    <Button onClick={saveModule}>Save Module</Button>
                </div>
            )}
        </div>
    );
};



export default Modules;

