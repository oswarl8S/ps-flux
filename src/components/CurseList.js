import React from 'react';
import PropTypes from 'prop-types';

function CurseList(props) {
  return (
    <table className={'table'}>
      <thead>
      <tr>
        <th>Title</th>
        <th>Author ID</th>
        <th>Category</th>
      </tr>
      </thead>
      <tbody>
      {props.curses.map((value, index) => (
        <tr key={index}>
          <td>{value.title}</td>
          <td>{value.authorId}</td>
          <td>{value.category}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

CurseList.prototype = {
  curses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    }).isRequired
  )
};

// CurseList.prototype = {
//   curses: PropTypes.array.isRequired
// };

// CurseList.defaultProps = {
//   curses: []
// };

export default CurseList;
