import { useContext } from 'react';
import { ModulesContext } from '../context/ModulesProvider.jsx';

export const useModules = () => {
    const context = useContext(ModulesContext);
    if (!context) {
        throw new Error('not used within modules provider');
    }
    return context;
};