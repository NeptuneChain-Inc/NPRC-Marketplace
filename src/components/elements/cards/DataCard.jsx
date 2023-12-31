import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getIcon } from '../../lib/icons'
import { motion, AnimatePresence } from 'framer-motion';
import { StreamItem, VideoItem } from './data-card'
import { CardContainer } from '../../lib/styled'

const DataCard = ({ cardTitle, icon, contents, isTable, width }) => {
  return (
    <CardContainer width={width}>
      <DataCardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardIcon icon={icon} />
      </DataCardHeader>
      <AnimatePresence>
        <CardContent>
          {isTable ? (
            <StyledTable>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {contents?.map((row, rowIndex) => (
                  Object.entries(row).map(([key, value], index) => (
                    <motion.tr key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </motion.tr>
                  ))
                ))}
              </tbody>
            </StyledTable>
          ) : (
            <ContentList>
              {contents?.map((content, index) => (
                <Content key={index}>
                  {(typeof content === 'object' && content?.id) ? (
                    content?.kind === 'stream' ? (
                      <StreamItem stream={content} />
                    ) : (
                      <VideoItem data={content} />
                    )
                  ) : (
                    content
                  )}
                </Content>
              ))}
            </ContentList>
          )}
        </CardContent>
      </AnimatePresence>
    </CardContainer>
  );
};

const DataCardHeader = styled.div`
    flex: 0 0 auto;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
  `;

const CardTitle = styled.span`
    margin: 1rem;
    font-size: 1rem;
    font-style: normal;
    font-family: 'Work Sans';
    font-weight: 500;
  `;

const CardIcon = styled(FontAwesomeIcon)`
    fill: #134b5f;
    width: auto;
    height: 80%;
    margin-right: 1rem;
  `;

const CardContent = styled.div`
    flex: 0 0 auto;
    width: 100%;
    height: 80%;
    overflow: auto;
  `;

const ContentList = styled.ul`
    height: auto;
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    
  `;

const Content = styled.li`
    // margin-top: 1rem;
    // margin-bottom: 1rem;
  `;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.01, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' },
};

CardContainer.defaultProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: cardVariants,
  whileHover: 'hover',
  transition: { type: 'spring', stiffness: 100 },
};

DataCard.defaultProps = {
  CardTitle: 'Card Title',
  icon: getIcon(''),
  contents: [],
  isTable: false
}

DataCard.propTypes = {
  CardTitle: PropTypes.string,
  icon: PropTypes.object,
  contents: PropTypes.array,
  isTable: PropTypes.bool
}

export default DataCard
