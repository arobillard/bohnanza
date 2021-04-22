import styled from "styled-components"
import { UserTitle } from "../../styles/Typography";
import Card from "../Card";
import EmptyField from "./EmptyField";

const UserFieldStyles = styled.div`
  text-align: center;
`;

const PlantedField = styled.div`
  position: relative;
`;

export default function UserField({
  field: { active, cardNum, numCards },
  fieldNum,
  userData,
  inUserBoard,
  handleHarvest
}) {

  return (
    <UserFieldStyles>
      {cardNum !== null ? (
        <PlantedField inUserBoard={inUserBoard}>
          {
            inUserBoard
            &&
            <UserTitle textAlign="center">Field {fieldNum}</UserTitle>
          }
          <Card
            cardNum={cardNum}
            inField={true}
            fieldNum={fieldNum}
            actionable={inUserBoard}
            handleHarvest={handleHarvest}
            numCards={numCards}
            inUserBoard={inUserBoard}
          />
        </PlantedField>
      ) : (
        <EmptyField
          fieldNum={fieldNum}
          active={active}
          inUserBoard={inUserBoard}
          userData={userData}
        />
      )}
    </UserFieldStyles>
  )
}