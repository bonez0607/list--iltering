# List Filtering

A simple plugin that creates filtering controls and based on data provided in the DOM. 

# Requirements

* jQuery v1.10.1+
* TableSorter.js v2.25.5

# Installation

1. Add Jquery to head  
`<link rel='stylesheet" href=../lib/javascript/jquery-1.10.1.min>`  

2. Add CSS file change to suit taste  
`<link rel='stylesheet" href=../lib/css/filter.css>`

3. Add data to DOM via preferred method. This example uses a table, but can also work on `<Div>` as well.
    1. Create a `<table>`  
    2. Get column names and place them into `<thead>`
    ```PHP
    <tr id="headers">  
     foreach ($headers as $column)  
      if ($column->getName() !== 'Link'){  
        echo "<th>" . preg_replace('/([A-Z])/' ,' $1', $column->getName()) . "</th>";
	    }  
    </tr>   
    ```
    
    
    
    3. In the `<tbody>` loop through each item in the data set to create rows and apply a `data-category` to those you want to make filterable. Example
        ```PHP
         foreach ($record as $webinar)
          echo "<tr class='webinar' data-category='" . $webinar->Date . " " . preg_replace('/\s+/', '-', strtolower($webinar->AgroforestryPractice)) . " " . preg_replace('/\s+/', '-', strtolower($webinar->WebinarHost)) . "'>",
          ```  
       In this example I change the space to a hyphen and changed the title to lowercase. Spaces must be removed, but this step  might not be necessary if the dataset is initially formated without spaces.   
  
   4. For each column with in the row apply the data that matches with the `<thead>` columns. Assign custom category style classes to each columns. (i.e year, host, etc.)
        ```PHP
          "<td class='practice'>" . $webinar->AgroforestryPractice . "</td>",
          "<td><a href='" . $webinar->Link . "'>" . $webinar->WebinarTitle . "</a></td>",
          "<td>" . $webinar->Presenter . "</td>",
          "<td class='year'>" . $webinar->Date . "</td>",
          "<td class='host'>" . $webinar->WebinarHost . "</td>",
        ```
   5. Create two more blank rows to account for on empty table or if no results can be found use class names `make-selection` and `no-results`. Add colspan to span across all tables.
        ```PHP
         <tr class="make-selection">
          <td colspan="5">
           <h2>Please make a selection</h2>
          </td>
         </tr>
         <tr class="no-results">
          <td colspan="5">
           <h2>No results found</h2>
           <p>Please update your selection.</p>
          </td>
         </tr>
        ```

4. Add TableSorter after data has been loaded to DOM
`<link rel='stylesheet" href=../lib/javascript/jquery.tablesorter.js>`  

# Using the filtering

1. Cache jquery selectors (i.e. `$('table') $('.webinar') $('.no-results') $('.make-selection')`  
2. To add select checkbox based on the Table data use addChkBx (i.d. addChkBx($('.year')); 

# To Do List
  * Improve readability - Perhaps converting to OOP
  * Remove dependencies on jQuery and tablesorter
