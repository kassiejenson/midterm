import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../hooks/useAuth.jsx';
import SelectInput from '../components/common/SelectInput.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';

const Pages = ({ addPage, updatePage, deletePage }) => {
    const { userInfo } = useAuth();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pageType, setPageType] = useState('GenericPage');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPageId, setCurrentPageId] = useState(null);
    const [newPageType, setNewPageType] = useState('');
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const savedPages = JSON.parse(localStorage.getItem('pages')) || [];
        setPages(savedPages);

        if (id) {
            const pageToEdit = savedPages.find(page => page.id === id);
            if (pageToEdit) {
                setTitle(pageToEdit.title);
                setContent(pageToEdit.content);
                setPageType(pageToEdit.pageType);
                setIsEditing(false);
                setCurrentPageId(pageToEdit.id);
            }
        }
    }, [id])

    const beginningPageTypes = [
        'Home Page',
        'Generic Page',
        'Assignment',
        'In-Class Exercise'
    ]
    const [pageTypeOptions, setPageTypeOptions] = useState(beginningPageTypes);


    const handleSavePage = () => {

        const newPage = {
            id: uuidv4(),
            title,
            content,
            pageType
        };

        const updatedPages = [...pages, newPage]
        localStorage.setItem('pages', JSON.stringify(updatedPages));
        setPages(updatedPages);
        navigate(`/pages/${newPage.id}`);

        setTitle('');
        setContent('');
        setPageType('Generic Page');
    };


    const handleUpdatePage = () => {
        const updatedPage = { id: currentPageId, title, content, pageType };
        const updatedPages = pages.map(page => (page.id === currentPageId ? updatedPage : page));
        localStorage.setItem('pages', JSON.stringify(updatedPages))
        setPages(updatedPages);
        setIsEditing(false);
        setTitle('');
        setContent('');
        setPageType('Generic Page');
        navigate(`/pages/${currentPageId}`);
    };

    const handleDeleteClick = () => {
        const updatedPages = pages.filter(page => page.id !== currentPageId);
        localStorage.setItem('pages', JSON.stringify(updatedPages));
        setPages(updatedPages);
        navigate('/pages');
    }

    const handleAddPageType = () => {
        if(newPageType && !pageTypeOptions.includes(newPageType)) {
            setPageTypeOptions([...pageTypeOptions, newPageType]);
            setNewPageType('');
        }
    };

    const currentPage = pages.find((page) => page.id === id);

    return (
        <div>
            <h1>Pages</h1>

            {id ? (
                currentPage ? (
                    isEditing ? (
                        <div>
                            <h1>Edit Page</h1>
                            <label>Page Title: </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Page Title"
                            />
                            <label>Page Content: </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Page Content"
                            />
                            <label>Page Type: </label>
                            <SelectInput
                                options={pageTypeOptions}
                                value={pageType}
                                onChange={(e) => setPageType(e.target.value)}
                                placeholder="Select Page Type"
                            />
                            <Button onClick={handleUpdatePage}>Save</Button>
                        </div>
                    ) : (
                        <Card title={currentPage.title}>
                            <p>{currentPage.content}</p>
                            {userInfo.isTeacher && (
                                <>
                                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                                    <Button onClick={() => handleDeleteClick(currentPage.id)}>Delete</Button>
                                </>
                            )}
                        </Card>
                    )
                ) : (
                    <p>Page not found</p>
                )
            ) : (
                <div>
                    <h1>Create a New Page</h1>
                            <label>Page Title: </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Page Title"
                                required
                            />
                            <label>Page Content: </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Page Content"
                                required
                            />
                            <label>Page Type: </label>
                            <SelectInput
                                options={pageTypeOptions}
                                value={pageType}
                                onChange={(e) => setPageType(e.target.value)}
                                placeholder="Select Page Type"
                            />
                            <Button onClick={handleSavePage}>Save Page</Button>

                    <h3>Add New Page Type</h3>
                    <input
                        type="text"
                        value={newPageType}
                        onChange={(e) => setNewPageType(e.target.value)}
                        placeholder="New Page Type"
                    />
                    <Button onClick={handleAddPageType}>Add Page Type</Button>
                </div>
            )}
        </div>      
    );
};

export default Pages;





{/* <div>
                            <label>Page Title: </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Page Title"
                                required
                            />
                            <label>Page Content: </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Page Content"
                                required
                            />
                            <label>Page Type: </label>
                            <SelectInput
                                options={pageTypeOptions}
                                value={pageType}
                                onChange={(e) => setPageType(e.target.value)}
                                placeholder="Select Page Type"
                            />
                            <Button onClick={handleSavePage}>Save Page</Button>
                        </div> */}