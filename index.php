<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<title>Webinar Library</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="en-US">

<link rel="stylesheet" href="css/960grid.css"> 
<link rel="stylesheet" href="css/960screen.css"> 
<link rel="stylesheet" href="css/typography.css"> 
<link rel="stylesheet" href="css/webinar-library.css">

<script type="text/javascript" src="js/jquery-1.10.2.js"></script>

<!-------------------------------------

			UPDATED STICKY
 
--------------------------------------->

<style type="text/css">
/* DIV Stick */
div#sticker {
  padding: 0 0 10px 0;
  margin: 0 0 20px 0;
  background: #FFF;
  width: 220px;
  z-index: 4;
}
.stick {
	position:fixed;
	top:0px;
  z-index: 4;
}
.unstick{
	position: absolute;
	top: 0;
}
#about {
position: relative;
z-index: 2;
}
#footer {
   background:#FFF;
   z-index: 3;
   position: relative
}
#main {
  position:relative;
  z-index: 1
}

</style>
<script type="text/javascript">
/*$(window).ready(function() {
	const s = $("#sticker");
	const abtOffset = $("#about").offset();
	let $window = $(window);
	let spos = s.offset();
	$window.scroll(function() {
		let windowpos = $(window).scrollTop();
		if (windowpos >= spos.top && (windowpos+s.height()) < abtOffset.top) {
			s.removeClass("unstick");
			s.addClass("stick");
			$(".stick").css({"margin-top": 0});
		}else if((windowpos+s.height()) > abtOffset.top){
			s.removeClass("stick");
			s.addClass("unstick");
			$(".unstick").css({"margin-top": abtOffset.top - s.height() - 50});
		} else {
			s.removeClass("stick");
			s.addClass("unstick");
			$(".unstick").css({"margin-top": 0});
		}
	});
});*/
$(window).ready(function() {
    const $about = $("#about");
    const s = $("#sticker");

    window.setTimeout(function(){ 
    	sticker(s, $about);
    }, 600);
   
    function sticker(stick, e){
    	stick.removeClass();
        let spos = stick.offset();
        let sheight = s.outerHeight();

        $(window).scroll(function() {
            let windowpos = $(this).scrollTop();
            if (windowpos >= spos.top && (windowpos+sheight) < $about.position().top) {
                stick.removeClass();
                stick.addClass("stick");
                $(".stick").css({"margin-top": 0});
                return false;
            }else if((windowpos+sheight) > $about.position().top){
                stick.removeClass();
                stick.addClass("unstick");
               $(".unstick").css({"margin-top": $("#main").height() - sheight});
                return false;
            }else {
            	s.removeClass();
            	stick.css('margin', '5px 0 20px 0');
            	return false;
            }
        });
    }
});
</script>

<!-------------------------------------------------

					END STICKY 
 
--------------------------------------------------->

</head>

<body>
	<noscript class="text-center"><h2>****Javascript is disabled - Functionality may be limited.****</h2></noscript>
	<?php
				$xml = simplexml_load_file('xml/webinar-library.xml') or die ("Error: Unable to load library");
				$record = $xml->record;
				$headers = $xml->record->children();
	?>
			
<div class="container_12">
	<div id=head style='height:250px; background:blue;'></div>
    <div class="grid_3" id="feature">
   		<div id="sticker">
			<div id="checkboxes">
    			<div class="fixed">
					<div class="uncheck">
						<button>Uncheck/Check All</button>
            		</div>	
            	
				</div> 
        	</div>  
    	</div> 
    <div style="height:300px; width:220px;">&nbsp;</div>
    </div> 
	<div class="grid_9 alpha" id="main">
    		<h1>Webinar Library</h1>
			<p>Many organizations use webinars to provide training, share information, and promote agroforestry. Use the table below to review archived webinars related to agroforestry practices and related issues. If you know of additional webinars that should be added to this list, please contact <a href="mailto:kdmacfarland@fs.fed.us">Kate MacFarland</a> at (402) 437-5178, x.4012.</p>

			<table id="Webinar-Library" style="display:block" class="tablesorter" >
				<thead>
					<tr id="headers">
						<?php
						foreach ($headers as $column)
							if ($column->getName() !== 'Link'){
							echo "<th>" . preg_replace('/([A-Z])/' ,' $1', $column->getName()) . "</th>";
							}
						?>
					</tr>
				</thead>
				<tbody id="webinar">
					<?php
						foreach ($record as $webinar)
							echo "<tr class='webinar' data-category='" . $webinar->Date . " " . preg_replace('/\s+/', '-', strtolower($webinar->AgroforestryPractice)) . " " . preg_replace('/\s+/', '-', strtolower($webinar->WebinarHost)) . "'>",
									"<td class='practice'>" . $webinar->AgroforestryPractice . "</td>",
									"<td><a href='" . $webinar->Link . "'>" . $webinar->WebinarTitle . "</a></td>",
									"<td>" . $webinar->Presenter . "</td>",
									"<td class='year'>" . $webinar->Date . "</td>",
									"<td class='host'>" . $webinar->WebinarHost . "</td>",
								"</tr>";
					?>
				<tr class="make-selection">
					<td colspan="5">
						<h2>Please make a selection</h2>
					</td>
				</tr>
				<tr class="no-results">
					<td colspan="5">
						<h2>No results found</h2>
            			<p>Please update your selection.</p>
            		</td></tr>
				</tbody> 
			</table>
		</div>
	<div class="clear">&nbsp;</div>
	<div id='about' style='height:500px; background:rgba(0,0,0,0.5)'></div>
</div>
<script type="text/javascript" src="js/jquery.tablesorter.js" ></script>
<script type="text/javascript" src="js/webinar-library-method.js"></script>

</body>
</html>
