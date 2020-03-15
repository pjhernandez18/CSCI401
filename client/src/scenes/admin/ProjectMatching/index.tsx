import React, { useState, useEffect } from 'react';
import { Text, Box, Anchor } from 'grommet';
import { ClipLoader } from "react-spinners";


export default () => {
  const [loading, setLoading]: any = useState(false);
  const [approvedProjects, setApprovedProjects]: any = useState([]);

  useEffect((): any => {
    const getProjects = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/getprojectsfromsemester/` + sessionStorage.getItem('viewingYear') + '/' + sessionStorage.getItem('viewingFallSpring'));
      const projects = await response.json();
      const acceptedProjects = [];
      for (const project of projects) {
        if (project.statusId === 2) {
          acceptedProjects.push(project);
        }
      }
      setApprovedProjects(acceptedProjects);
    }
    getProjects();
  }, []);

  const assignProject = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/assignment`);
    const json = await response.json();
    setApprovedProjects(json);
    setLoading(false);
    console.log('hi', json);
  }
  console.log(approvedProjects);
  return (
    <Box width='full' pad='medium' gap='small'>
      <Box direction='row' justify='between' align='center'>
        <Text weight='bold' size='large'>Projects</Text>
        <Box direction='row' gap='small'>
          {loading && <ClipLoader size={50} color='#990000' />}
          <Box background='brand' pad='small' align='center' elevation='small' round='xsmall' style={{ cursor: 'pointer' }} onClick={() => assignProject()}>
            <Text>Assign Projects</Text>
          </Box>
        </Box>
      </Box>
      <Box width='full' background='white' elevation='small' round='xsmall'>
        {approvedProjects.length > 0 ? approvedProjects.map((project: any, index: number) => (
          <Anchor href={`/admin/project/${project.projectId}/view`}>
            <Box pad='medium' border={{ side: 'bottom', size: 'xsmall' }} round={index === approvedProjects.length - 1 ? 'xsmall' : 'none'} style={{ cursor: 'pointer' }}>
              <Box direction='row' gap='xsmall' align='center'>
                <Text>{project.projectName}</Text>
                {project.members.map((student: any) => (
                  <Text size='small' color='dark-4' weight='normal'>{student.firstName} {student.lastName}</Text>
                ))}
              </Box>
              <Text size='small' color='dark-4'>{project.stakeholderCompany}</Text>
            </Box>
          </Anchor>
        ))
          :
          <Box pad='medium' border={{ side: 'bottom', size: 'xsmall' }} round='xsmall'>
            There are no approved projects.
          </Box>
        }
      </Box>
    </Box>
  )
}