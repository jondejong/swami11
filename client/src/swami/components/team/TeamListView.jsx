import React from 'react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'

class TeamListView extends React.Component {

  componentDidMount = () => {
    this.props.loadTeams()
  }

  render() {
    const {teams, loaded} = this.props

    let content

    if (loaded) {
      const rows = teams.map(team => (
        <TableRow key={team.id} style={this.inputStyle}>
          <TableRowColumn>{team.name} {team.nickName}</TableRowColumn>
          <TableRowColumn>{team.conference}</TableRowColumn>
        </TableRow>
      ));

      content = (
        <div>
          <h3>Teams</h3>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Conference</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {rows}
            </TableBody>
          </Table>
        </div>
      )
    } else {
      content = (
        <div>
          <CircularProgress size={60} thickness={7}/>
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default TeamListView