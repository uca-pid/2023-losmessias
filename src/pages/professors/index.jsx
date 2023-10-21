// Components
import ProfessorCard from '@/components/cards/ProfessorCard';

// Hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

// Utils
import { getColor } from '@/utils/getColor';

// Mui
import { Box, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

export default function Professors() {
    const [data, setData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const router = useRouter();
    const [professors, setProfessors] = useState([]);
    const [locationSelected, setLocationSelected] = useState([]);
    const [subjectSelected, setSubjectSelected] = useState([]);
    const user = useUser();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (user.id) {
            const requestOptions = {
                method: 'GET',
                headers: { Authorization: `Bearer ${user.token}` },
            };
            fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/professor/all`, requestOptions).then(res => {
                if (res.status === 200) console.log(res);
                res.json().then(json => {
                    setData(json);
                    setProfessors(json);
                });
            });
            fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/subject/all`).then(res => res.json().then(json => setSubjects(json)));
            fetch(`${process.env.NEXT_PUBLIC_API_URI}/api/student/${user.id}`, requestOptions).then(res => {
                if (res.status === 401) {
                    router.push('/');
                }
                res.json().then(json => setUserName(json.firstName + ' ' + json.lastName));
            });
        }
    }, [user, router]);

    const handleFilter = () => {
        if (locationSelected.length > 0 && subjectSelected.length === 0) {
            setProfessors(data.filter(professor => locationSelected.includes(professor.location)));
        } else if (locationSelected.length === 0 && subjectSelected.length > 0) {
            setProfessors(data.filter(professor => professor.subjects.some(subject => subjectSelected.includes(subject.name))));
        } else if (locationSelected.length > 0 && subjectSelected.length > 0) {
            setProfessors(
                data.filter(professor =>
                    professor.subjects.some(
                        subject => subjectSelected.includes(subject.name) && locationSelected.includes(professor.location)
                    )
                )
            );
        } else {
            setProfessors(data);
        }
    };

    const handleLocationChange = event => {
        setLocationSelected(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    };

    const handleSubjectChange = event => {
        setSubjectSelected(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: '#F5F5F5',
                }}
            >
                <Box
                    sx={{
                        flexDirection: 'column',
                        minWidth: 300,
                        minHeight: 300,
                        display: 'flex',
                        borderColor: 'black',
                        borderWidth: '1pt',
                        borderRightStyle: 'solid',
                        px: 1,
                    }}
                >
                    <Typography variant='h3' component='div' sx={{ mt: 2, mb: 2, ml: 2 }} color={'black'}>
                        Filters
                    </Typography>
                    <Divider width={'100%'} sx={{ my: 2 }} />
                    <FormControl sx={{ ml: 2, backgroundColor: '#fff' }}>
                        <InputLabel id='office-select'>Location</InputLabel>
                        <Select
                            multiple
                            labelId='office-select'
                            input={<OutlinedInput label='Location' />}
                            value={locationSelected}
                            onChange={event => handleLocationChange(event)}
                            onClose={handleFilter}
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {data.map((profesor, index) => (
                                <MenuItem key={index} value={profesor.location}>
                                    {profesor.location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ ml: 2, marginTop: '1.5rem', backgroundColor: '#fff' }}>
                        <InputLabel id='office-select'>Subjects</InputLabel>
                        <Select
                            multiple
                            labelId='office-select'
                            input={<OutlinedInput label='Subjects' />}
                            value={subjectSelected}
                            onChange={event => handleSubjectChange(event)}
                            onClose={handleFilter}
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} sx={{ backgroundColor: getColor(value) }} />
                                    ))}
                                </Box>
                            )}
                        >
                            {subjects.map(subject => (
                                <MenuItem key={subject.id} value={subject.name}>
                                    {subject.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', mb: 2, ml: 2 }}>
                    {professors.map((profesor, index) => {
                        if (profesor.subjects.length > 0) {
                            return (
                                <ProfessorCard
                                    key={index}
                                    professorId={profesor.id}
                                    studentId={user.id}
                                    name={profesor.firstName + ' ' + profesor.lastName}
                                    email={profesor.email}
                                    phone={profesor.phone}
                                    sex={profesor.sex}
                                    office={profesor.location}
                                    style={{ mr: 3, mt: 2 }}
                                    subjects={profesor.subjects}
                                />
                            );
                        }
                    })}
                </Box>
            </Box>
        </>
    );
}