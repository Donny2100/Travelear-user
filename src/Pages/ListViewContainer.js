import React from 'react';
import {Table} from 'reactstrap';
import ListView from './ListView';
import './ListView.css';

// mock up data -- need to removed in the future
import { dumbList } from '../helpers/mock';

const ListViewContainer = ({tracks}) => (
  <div>
    <Table bordered>
      <thead>
      <tr>
        <th className="left-col">
          <h3>Time</h3>
        </th>
        <th>
          <h3>Destination</h3>
        </th>
      </tr>
      </thead>
      <tbody>
      {tracks.map((item, index)=> (
        <ListView 
          key={index} 
          track={item} 
          id={index} /> 
      ))}
      </tbody>
    </Table>
  </div>
)

export default ListViewContainer;