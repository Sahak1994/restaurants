import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import { ArrowBack } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import classes from './Header.module.css';

const useStyles = makeStyles({
  root: {
    // backgroundColor: '#fff',
    color: 'orangered',
    marginRight: '8px',
    cursor: 'pointer',
  },
});

const Header = ({
  backButton,
  title,
}) => {
  const history = useHistory();
  const styles = useStyles();

  return (
    <div className={classes.Header}>
      {
        backButton && (
          <ArrowBack 
            fontSize='large' 
            className={styles.root}
            onClick={() => history.push('./')} />
        )
      }
      <p>{title}</p>
    </div>
  );
}

Header.propTypes = {
  backButton: PropTypes.bool,
  title: PropTypes.string,
}

export default Header;
