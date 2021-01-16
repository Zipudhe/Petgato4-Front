export const convertDate = (data) => (
    data.split('T')[0].split('-').reverse().join('/')
);