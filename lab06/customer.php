<!DOCTYPE html>
<html>
	<head>
		<title>Fruit Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
		if (empty($_POST['name']) || empty($_POST['membership']) || empty($_POST['option']) || empty($_POST['fruits']) || empty($_POST['quantity']) || empty($_POST['credit']) || empty($_POST['cc'])) { ?>

		<!-- Ex 4 : Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't fill out the form completely. <a href="fruitstore.html">Try again?</a></p>

		<?php
		// Ex 5 : 
		// Check if the name is composed of alphabets, dash(-), ora single white space.
		} elseif (preg_match('/^[a-z]+([-| ]{1}[a-z]+)*$/i', $_POST['name']) == false) {  ?>

		<!-- Ex 5 : Display the below error message : -->
		<h1>Sorry</h1>
		<p>You didn't provide a valid name. <a href="fruitstore.html">Try again?</a></p>

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
		} elseif ((!preg_match('/^4[0-9]{15}$/', $_POST['credit']) && $_POST['cc'] == "Visa") || (!preg_match('/^5[0-9]{15}$/', $_POST['credit']) && $_POST['cc'] == "MasterCard")) {
		?>

		<!-- Ex 5 : Display the below error message : -->
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="fruitstore.html">Try again?</a></p>

		<?php
		# if all the validation and check are passed 
		} else {
		?>

		<h1>Thanks!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<?php
			$name = isset($_POST['name']) ? $_POST['name'] : '';
			$membership = isset($_POST['membership']) ? $_POST['membership'] : '';
			$option = isset($_POST['option']) ? $_POST['option'] : '';
			$fruits = isset($_POST['fruits']) ? $_POST['fruits'] : '';
			$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';
			$credit = isset($_POST['credit']) ? $_POST['credit'] : '';
			$cc = isset($_POST['cc']) ? $_POST['cc'] : '';
		?>
		<ul> 
			<li>Name: <?= $name ?></li>
			<li>Membership Number: <?= $membership ?></li>
			<li>Options: <?= processCheckbox($option) ?></li>
			<li>Fruits: <?= $fruits." - ".$quantity ?></li>
			<li>Credit Card: <?= $credit ?> (<?= $cc ?>)</li>
		</ul>
		
		<!-- Ex 3 : -->
			<p>This is the sold fruits count list:</p>
		<?php
			$filename = "customers.txt";
			/* Ex 3: 
			 * Save the submitted data to the file 'customers.txt' in the format of : "name;membershipnumber;fruit;number".
			 * For example, "Scott Lee;20110115238;apple;3"
			 */
			file_put_contents($filename, $name.';'.$membership.';'.$fruits.';'.$quantity."\n", FILE_APPEND);
		?>
		
		<!-- Ex 3: list the number of fruit sold in a file "customers.txt".
			Create unordered list to show the number of fruit sold -->
		<ul>
		<?php 
			$fruitcounts = soldFruitCount($filename);
			foreach($fruitcounts as $key => $value) { ?>
				<li><?= $key." - ".$value ?></li>
			<? } ?>
		</ul>
		
	<? } ?>
		
		<?php
			/* Ex 3 :
			* Get the fruits species and the number from "customers.txt"
			* 
			* The function parses the content in the file, find the species of fruits and count them.
			* The return value should be an key-value array
			* For example, array("Melon"=>2, "Apple"=>10, "Orange" => 21, "Strawberry" => 8)
			*/
			function soldFruitCount($filename) {
				$fruits = array("Melon" => 0, "Apple" => 0, "Orange" => 0, "Strawberry" => 0);
				foreach (file($filename) as $line) {
					$tmp = explode(";", $line);
					if (array_key_exists($tmp[2], $fruits)) {
						$fruits[$tmp[2]] += $tmp[3];
					}
				}
				return $fruits;
			}
	
			function processCheckbox($names){ 
				$options = '';
				foreach ($names as $option) {
					$options = $options.','.$option;
				}
				$options = substr($options, 1);
				return $options;
			}
		?>
		
	</body>
</html>
