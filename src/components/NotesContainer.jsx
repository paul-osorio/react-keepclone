import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";

const NotesContainer = () => {
  const breakpointColumnsObj = {
    default: 4,
    2560: 9,
    2070: 8,
    1820: 6,
    1575: 5,
    1330: 4,
    1080: 3,
    800: 2,
    600: 1,
  };
  return (
    <div className="block my-0 mx-auto mt-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <NoteCard />
        <NoteCard content="asgasgas asglaskgas ASFSAASF SAFASFASFSA asfAS FKASJFHAKSJFH ASKJFHASJKF KJFHSAKJF ASKJF" />
        <NoteCard />
        <NoteCard content="ASFAS ASFASF asgasg" />
        <NoteCard content="ASFAS ASFASF ASFSA FASSAAF" />
        <NoteCard content="ASFAS ASFASF ASFSA FASSAAF" />
        <NoteCard content="asgasgas asglaskgas ASFSAASF SAFASFASFSA asfAS FKASJFHAKSJFH ASKJFHASJKF KJFHSAKJF ASKJF" />
        <NoteCard content="ASFAS ASFASF ASFSA FASSAAF" />
        <NoteCard content="ASFAS ASFASF ASFSA FASSAAF" />
        <NoteCard />
      </Masonry>
    </div>
  );
};

export default NotesContainer;
