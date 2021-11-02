const KEYS = {
    members: 'members',
    memberId: 'memberId'
}

export const getProjectCollection = () => ([
    { id: '1', title: 'Cortex' },
    { id: '2', title: 'Helix' },
    { id: '3', title: 'Caliditas' },
    { id: '4', title: 'Open Cloud' },
    { id: '5', title: 'Pager' },
    { id: '6', title: 'Miles' },
    { id: '7', title: 'Stretch Inc' },
    { id: '8', title: 'College ERP' },
])

export function insertMember(data) {
    let members = getAllMembers();
    data['id'] = generateMemberId()
    members.push(data)
    localStorage.setItem(KEYS.members, JSON.stringify(members))
}

export function updateMember(data) {
    let members = getAllMembers();
    let recordIndex = members.findIndex(x => x.id == data.id);
    members[recordIndex] = { ...data }
    localStorage.setItem(KEYS.members, JSON.stringify(members));
}

export function generateMemberId() {
    if (localStorage.getItem(KEYS.memberId) == null)
        localStorage.setItem(KEYS.memberId, '0')
    var id = parseInt(localStorage.getItem(KEYS.memberId))
    localStorage.setItem(KEYS.memberId, (++id).toString())
    return id;
}

export function getAllMembers() {
    if (localStorage.getItem(KEYS.members) == null)
        localStorage.setItem(KEYS.members, JSON.stringify([]))
    let members = JSON.parse(localStorage.getItem(KEYS.members));
    let projects = getProjectCollection();
    return members.map(x => ({
        ...x,
        project: projects[x.projectId - 1].title
    }))
}