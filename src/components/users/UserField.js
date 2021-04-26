import styled from "styled-components"
import { UserTitle } from "../../styles/Typography";
import Card from "../cards/Card";
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
  handleHarvest,
  cardLocation
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
            location={cardLocation}
            fieldNum={fieldNum}
            actionable={inUserBoard}
            handleHarvest={handleHarvest}
            numCards={numCards}
            inUserBoard={inUserBoard}
            index={`${userData.userId}-field-${fieldNum}`}
            userData={userData}
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