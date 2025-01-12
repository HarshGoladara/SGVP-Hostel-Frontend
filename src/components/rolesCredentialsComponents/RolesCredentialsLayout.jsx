import React, { useState } from 'react';
import RolesCredentialsNavbar from './RolesCredentialsNavbar';
import RolesCredentialsBody from './RolesCredentialsBody';

function RolesCredentialsLayout() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberList, setPageNumberList] = useState([]);
  const [rolesCredentials, setRolesCredentials] = useState([]);
  const [rectors, setRectors] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <RolesCredentialsNavbar
          rolesCredentials={rolesCredentials}
          setRolesCredentials={setRolesCredentials}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          pageNumberList={pageNumberList}
          setPageNumberList={setPageNumberList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={handleLoading}
          rectors={rectors}
          setRectors={setRectors}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <RolesCredentialsBody
          rolesCredentials={rolesCredentials}
          setRolesCredentials={setRolesCredentials}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          pageNumberList={pageNumberList}
          setPageNumberList={setPageNumberList}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          isLoading={handleLoading}
          rectors={rectors}
          setRectors={setRectors}
          className="flex-grow"
        />
      </div>
    </div>
  );
}

export default RolesCredentialsLayout;
