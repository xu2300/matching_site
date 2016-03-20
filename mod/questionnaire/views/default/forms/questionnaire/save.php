<div>
	<br />
	<label for="frequency"><?= elgg_echo("1.How often do you play?"); ?></label><br />
	<?= elgg_view('input/radio', [
	"name" => 'frequency',
	 "options" => array("0 – 5 Hours / Week"=>1,
	 "6 – 10 Hours / Week"=>2,
	 "11 – 15 Hours / Week"=>3,
	 "16 – 20 Hours / Week"=>4,
	 "20+  Hours / Week"=>5),
	 'align' => 'horizontal'
	 ]
	 ); ?>
</div>

<div>
	<br />
	<label for="playtime"><?= elgg_echo("2.When do you play (multiple answers)?"); ?></label><br />

<table border="1" cellpadding="5" cellspacing="5">
<tr>
<td>Week</td>
<td>Monday</td>
<td>Tudesday</td>
<td>Wednesday</td>
<td>Thursday</td>
<td>Friday</td>
<td>Saturday</td>
<td>Sunday</td>

</tr>
<tr>
<td>Early Morning</td>
<td><input type="checkbox" name="1Mon" value="1Mon" /></td>
<td><input type="checkbox" name="1Tue" value="1Tue" /></td>
<td><input type="checkbox" name="1Wen" value="1Wen" /></td>
<td><input type="checkbox" name="1Thu" value="1Thu" /></td>
<td><input type="checkbox" name="1Fri" value="1Fri" /></td>
<td><input type="checkbox" name="1Sat" value="1Sat" /></td>
<td><input type="checkbox" name="1Sun" value="1Sun" /></td>
</tr>

<tr>
<td>Morning</td>
<td><input type="checkbox" name="2Mon" value="2Mon" /></td>
<td><input type="checkbox" name="2Tue" value="2Tue" /></td>
<td><input type="checkbox" name="2Wen" value="2Wen" /></td>
<td><input type="checkbox" name="2Thu" value="2Thu" /></td>
<td><input type="checkbox" name="2Fri" value="2Fri" /></td>
<td><input type="checkbox" name="2Sat" value="2Sat" /></td>
<td><input type="checkbox" name="2Sun" value="2Sun" /></td>
</tr>

<tr>
<td>Noon</td>
<td><input type="checkbox" name="3Mon" value="3Mon" /></td>
<td><input type="checkbox" name="3Tue" value="3Tue" /></td>
<td><input type="checkbox" name="3Wen" value="3Wen" /></td>
<td><input type="checkbox" name="3Thu" value="3Thu" /></td>
<td><input type="checkbox" name="3Fri" value="3Fri" /></td>
<td><input type="checkbox" name="3Sat" value="3Sat" /></td>
<td><input type="checkbox" name="3Sun" value="3Sun" /></td>
</tr>

<tr>
<td>Afternoon</td>
<td><input type="checkbox" name="4Mon" value="4Mon" /></td>
<td><input type="checkbox" name="4Tue" value="4Tue" /></td>
<td><input type="checkbox" name="4Wen" value="4Wen" /></td>
<td><input type="checkbox" name="4Thu" value="4Thu" /></td>
<td><input type="checkbox" name="4Fri" value="4Fri" /></td>
<td><input type="checkbox" name="4Sat" value="4Sat" /></td>
<td><input type="checkbox" name="4Sun" value="4Sun" /></td>
</tr>

<tr>
<td>Evening</td>
<td><input type="checkbox" name="5Mon" value="5Mon" /></td>
<td><input type="checkbox" name="5Tue" value="5Tue" /></td>
<td><input type="checkbox" name="5Wen" value="5Wen" /></td>
<td><input type="checkbox" name="5Thu" value="5Thu" /></td>
<td><input type="checkbox" name="5Fri" value="5Fri" /></td>
<td><input type="checkbox" name="5Sat" value="5Sat" /></td>
<td><input type="checkbox" name="5Sun" value="5Sun" /></td>
</tr>

<tr>
<td>Overnight</td>
<td><input type="checkbox" name="6Mon" value="6Mon" /></td>
<td><input type="checkbox" name="6Tue" value="6Tue" /></td>
<td><input type="checkbox" name="6Wen" value="6Wen" /></td>
<td><input type="checkbox" name="6Thu" value="6Thu" /></td>
<td><input type="checkbox" name="6Fri" value="6Fri" /></td>
<td><input type="checkbox" name="6Sat" value="6Sat" /></td>
<td><input type="checkbox" name="6Sun" value="6Sun" /></td>
</tr>
</table>

</div>

<label><?= elgg_echo("3.	What do you play on (multiple answers)?"); ?></label>
<?= elgg_view('input/checkboxes', [
	"name" => 'consoles',
	 "options" => array("XBOX One"=>1,
	 "XBOX 360"=>2,
	 "PlayStation 4"=>3,
	 "PlayStation 3"=>4,
	 "Wii U"=>5,
	 "Wii"=>6,
	 "Mobile"=>7,
	 "PC"=>8),
	 'align' => 'horizontal'
	 ]
	 ); ?>
	 Other: <input type="text" name="otherconsole"><br />

	 <div>
	 <br />
   <label><?= elgg_echo("4.	Do you like to use your microphone while playing online with others?"); ?></label>
   <?= elgg_view('input/radio', [
	"name" => 'mic',
	 "options" => array("Yes"=>1,
	 "No"=>2,
	 "Sometimes"=>3),
	 'align' => 'horizontal'
	 ]
	 ); ?>
</div>

<div>
   <label><?= elgg_echo("5.	Who do you usually play with (multiple answers)?"); ?></label>
   <?= elgg_view('input/checkboxes', [
	"name" => 'playwith',
	 "options" => array("Friends"=>1,
	 "Family"=>2,
	 "Strangers"=>3),
	
	 'align' => 'horizontal'
	 ]
	 ); ?>
</div>

<div>
   <label><?= elgg_echo("6.	What games do you like to play with others (multiple answers)?"); ?></label>
   <input type="text" name="game1"><br />
   <input type="text" name="game2"><br />
   <input type="text" name="game3"><br />
   <input type="text" name="game4"><br />
   <input type="text" name="game5"><br />
</div>


<div>
    <?= elgg_view('input/submit', ['value' => elgg_echo('submit')]); ?>
</div>