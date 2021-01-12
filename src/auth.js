export const isAuthenticated = () => true;

export const isAdmin = () => {
    if(!isAuthenticated()){
        return false;
    }

    return true;
}