import { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Departments {
    department: string;
    sub_departments: string[];
}

const data: Departments[] = [
    {
        department: "customer_service",
        sub_departments: [
            "support",
            "customer_success"
        ]
    },
    {
        department: "design",
        sub_departments: [
            "graphic_design",
            "product_design",
            "web_design"
        ]
    }
];

const Department = () => {
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

    const handleExpand = (department: string) => {
        setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
    };

    const handleSelectDepartment = (department: string, subDepartments: string[]) => {
        const isSelected = selected[department] || false;
        const newSelected = { ...selected, [department]: !isSelected };
        subDepartments.forEach(sub => newSelected[sub] = !isSelected);
        setSelected(newSelected);
    };

    const handleSelectSubDepartment = (department: string, subDepartment: string) => {
        const newSelected = { ...selected, [subDepartment]: !selected[subDepartment] };
        const allSelected = data.find(d => d.department === department)?.sub_departments.every(sub => newSelected[sub]) || false;
        newSelected[department] = allSelected;
        setSelected(newSelected);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={"50px"}>
            <Box width="50%" bgcolor="#e0e0e0" p={2} borderRadius={2}>
                <List>
                    {data.map(({ department, sub_departments }) => (
                        <div key={department}>
                            <ListItem>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected[department] || false}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={() => handleSelectDepartment(department, sub_departments)}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={department.replace('_', ' ')} />
                                <IconButton onClick={() => handleExpand(department)}>
                                    {expanded[department] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </ListItem>
                            <Collapse in={expanded[department]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {sub_departments.map(sub => (
                                        <ListItem key={sub} style={{ paddingLeft: '2rem' }}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={selected[sub] || false}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    onClick={() => handleSelectSubDepartment(department, sub)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={sub.replace('_', ' ')} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default Department
