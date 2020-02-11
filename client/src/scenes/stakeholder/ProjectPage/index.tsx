import * as React from 'react';
import { Box, Text } from 'grommet';
import ProjectInformation from './ProjectInformation';
import {
  RouteComponentProps
} from 'react-router';

export default class ProjectPage extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <Box>
        <Box width='full' align='center' pad='medium'>
          <ProjectInformation projectId={this.props.match.params.projectId} entryType={this.props.match.params.entry} />
        </Box>
      </Box>
    )
  }
}