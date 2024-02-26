import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/contactsSlice";

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChangeFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <label>
      Filter contacts by name:
      <input type="text" value={filter} onChange={handleChangeFilter} />
    </label>
  );
};

export default Filter;
