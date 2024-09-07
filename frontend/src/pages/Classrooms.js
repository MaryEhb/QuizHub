import React from 'react';
import { useAuth } from '../context/AuthContext';

const Classrooms = () => {

  const user = useAuth();
  const { ownedClassrooms, enrolledClassrooms } = user;

  return (
    <div>
        {/* TODO: Create real classroom page content */}
      <h1>Classroom Page</h1>

      <section>
        <h2>Owned Classrooms</h2>
        <ul>
          {ownedClassrooms.length > 0 ? (
            ownedClassrooms.map((classroom) => (
              <li key={classroom.id}>
                <h3>{classroom.title}</h3>
                <p>{classroom.description}</p>
                <p>Members: {classroom.membersCount}</p>
                <p>Tests: {classroom.testsCount}</p>
                <p>Max Score: {classroom.maxScore}</p>
              </li>
            ))
          ) : (
            <p>You do not own any classrooms.</p>
          )}
        </ul>
      </section>

      <section>
        <h2>Enrolled Classrooms</h2>
        <ul>
          {enrolledClassrooms.length > 0 ? (
            enrolledClassrooms.map((classroom) => (
              <li key={classroom.id}>
                <h3>{classroom.title}</h3>
                <p>{classroom.description}</p>
                <p>Members: {classroom.membersCount}</p>
                <p>Tests: {classroom.testsCount}</p>
                <p>Max Score: {classroom.maxScore}</p>
              </li>
            ))
          ) : (
            <p>You are not enrolled in any classrooms.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Classrooms;