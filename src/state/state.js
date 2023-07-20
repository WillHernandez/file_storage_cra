import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({ 
	user : null 
});

export { setGlobalState, useGlobalState }