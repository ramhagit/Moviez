export  const releaseDateLimit = () => {
    const nowDate = new Date();
    const mm = nowDate.getMonth();
    const dd = nowDate.getDate();
    return `${nowDate.getFullYear()}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
}

export const currentDate = new Date().toISOString().split('T')[0];