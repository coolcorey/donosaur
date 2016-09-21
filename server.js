var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();
//app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var url = 'mongodb://localhost:27017/donosaur';

var perpage = 50;

var nteeTypes = {
  "Arts and Culture": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52", "A53", "A54", "A55", "A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63", "A64", "A65", "A66", "A67", "A68", "A69", "A70", "A71", "A72", "A73", "A74", "A75", "A76", "A77", "A78", "A79", "A80", "A81", "A82", "A83", "A84", "A85", "A86", "A87", "A88", "A89", "A90", "A91", "A92", "A93", "A94", "A95", "A96", "A97", "A98", "A99"],
  "Animals/Environment": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C30", "C31", "C32", "C33", "C34", "C35", "C36", "C37", "C38", "C39", "C40", "C41", "C42", "C43", "C44", "C45", "C46", "C47", "C48", "C49", "C50", "C51", "C52", "C53", "C54", "C55", "C56", "C57", "C58", "C59", "C60", "C61", "C62", "C63", "C64", "C65", "C66", "C67", "C68", "C69", "C70", "C71", "C72", "C73", "C74", "C75", "C76", "C77", "C78", "C79", "C80", "C81", "C82", "C83", "C84", "C85", "C86", "C87", "C88", "C89", "C90", "C91", "C92", "C93", "C94", "C95", "C96", "C97", "C98", "C99", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", "D21", "D22", "D23", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D31", "D32", "D33", "D34", "D35", "D36", "D37", "D38", "D39", "D40", "D41", "D42", "D43", "D44", "D45", "D46", "D47", "D48", "D49", "D50", "D51", "D52", "D53", "D54", "D55", "D56", "D57", "D58", "D59", "D60", "D61", "D62", "D63", "D64", "D65", "D66", "D67", "D68", "D69", "D70", "D71", "D72", "D73", "D74", "D75", "D76", "D77", "D78", "D79", "D80", "D81", "D82", "D83", "D84", "D85", "D86", "D87", "D88", "D89", "D90", "D91", "D92", "D93", "D94", "D95", "D96", "D97", "D98", "D99"],
  "Child and Family Services": ["O1", "O2", "O3", "O4", "O5", "O6", "O7", "O8", "O9", "O10", "O11", "O12", "O13", "O14", "O15", "O16", "O17", "O18", "O19", "O20", "O21", "O22", "O23", "O24", "O25", "O26", "O27", "O28", "O29", "O30", "O31", "O32", "O33", "O34", "O35", "O36", "O37", "O38", "O39", "O40", "O41", "O42", "O43", "O44", "O45", "O46", "O47", "O48", "O49", "O50", "O51", "O52", "O53", "O54", "O55", "O56", "O57", "O58", "O59", "O60", "O61", "O62", "O63", "O64", "O65", "O66", "O67", "O68", "O69", "O70", "O71", "O72", "O73", "O74", "O75", "O76", "O77", "O78", "O79", "O80", "O81", "O82", "O83", "O84", "O85", "O86", "O87", "O88", "O89", "O90", "O91", "O92", "O93", "O94", "O95", "O96", "O97", "O98", "O99", "P20", "P21", "P22", "P23", "P24", "P25", "P26", "P27", "P28", "P29", "P30", "P31", "P32", "P33", "P34", "P35", "P36", "P37", "P38", "P39", "P40", "P41", "P42", "P43", "P44", "P45", "P46", "P47", "A52", "E40"],
  "Civil Rights/Advocacy": ["P1", "R99"],
  "Community and Neighborhoods": ["E32", "I20", "I21", "I22", "I23", "K30", "K31", "K32", "K33", "K34", "K35", "K36", "O20", "O21", "O22", "O23", "P28", "S20", "S21", "S22", "W24"],
  "Education": ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", "B21", "B22", "B23", "B24", "B25", "B26", "B27", "B28", "B29", "B30", "B31", "B32", "B33", "B34", "B35", "B36", "B37", "B38", "B39", "B40", "B41", "B42", "B43", "B44", "B45", "B46", "B47", "B48", "B49", "B50", "B51", "B52", "B53", "B54", "B55", "B56", "B57", "B58", "B59", "B60", "B61", "B62", "B63", "B64", "B65", "B66", "B67", "B68", "B69", "B70", "B71", "B72", "B73", "B74", "B75", "B76", "B77", "B78", "B79", "B80", "B81", "B82", "B83", "B84", "B85", "B86", "B87", "B88", "B89", "B90", "B91", "B92", "B93", "B94", "B95", "B96", "B97", "B98", "B99", "M40", "M41", "M42", "Y33"],
  "Employment": ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J20", "J21", "J22", "J23", "J24", "J25", "J26", "J27", "J28", "J29", "J30", "J31", "J32", "J33", "J34", "J35", "J36", "J37", "J38", "J39", "J40", "J41", "J42", "J43", "J44", "J45", "J46", "J47", "J48", "J49", "J50", "J51", "J52", "J53", "J54", "J55", "J56", "J57", "J58", "J59", "J60", "J61", "J62", "J63", "J64", "J65", "J66", "J67", "J68", "J69", "J70", "J71", "J72", "J73", "J74", "J75", "J76", "J77", "J78", "J79", "J80", "J81", "J82", "J83", "J84", "J85", "J86", "J87", "J88", "J89", "J90", "J91", "J92", "J93", "J94", "J95", "J96", "J97", "J98", "J99", "P51", "V37", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30", "Y31", "Y32", "Y33", "Y34", "Y35"],
  "Food and Nutrition": ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12", "K13", "K14", "K15", "K16", "K17", "K18", "K19", "K20", "K21", "K22", "K23", "K24", "K25", "K26", "K27", "K28", "K29", "K30", "K31", "K32", "K33", "K34", "K35", "K36", "K37", "K38", "K39", "K40", "K41", "K42", "K43", "K44", "K45", "K46", "K47", "K48", "K49", "K50", "K51", "K52", "K53", "K54", "K55", "K56", "K57", "K58", "K59", "K60", "K61", "K62", "K63", "K64", "K65", "K66", "K67", "K68", "K69", "K70", "K71", "K72", "K73", "K74", "K75", "K76", "K77", "K78", "K79", "K80", "K81", "K82", "K83", "K84", "K85", "K86", "K87", "K88", "K89", "K90", "K91", "K92", "K93", "K94", "K95", "K96", "K97", "K98", "K99"],
  "Grants": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14", "T15", "T16", "T17", "T18", "T19", "T20", "T21", "T22", "T23", "T24", "T25", "T26", "T27", "T28", "T29", "T30", "T31", "T32", "T33", "T34", "T35", "T36", "T37", "T38", "T39", "T40", "T41", "T42", "T43", "T44", "T45", "T46", "T47", "T48", "T49", "T50", "T51", "T52", "T53", "T54", "T55", "T56", "T57", "T58", "T59", "T60", "T61", "T62", "T63", "T64", "T65", "T66", "T67", "T68", "T69", "T70", "T71", "T72", "T73", "T74", "T75", "T76", "T77", "T78", "T79", "T80", "T81", "T82", "T83", "T84", "T85", "T86", "T87", "T88", "T89", "T90", "T91", "T92", "T93", "T94", "T95", "T96", "T97", "T98", "T99"],
  "International Affairs": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23", "Q24", "Q25", "Q26", "Q27", "Q28", "Q29", "Q30", "Q31", "Q32", "Q33", "Q34", "Q35", "Q36", "Q37", "Q38", "Q39", "Q40", "Q41", "Q42", "Q43", "Q44", "Q45", "Q46", "Q47", "Q48", "Q49", "Q50", "Q51", "Q52", "Q53", "Q54", "Q55", "Q56", "Q57", "Q58", "Q59", "Q60", "Q61", "Q62", "Q63", "Q64", "Q65", "Q66", "Q67", "Q68", "Q69", "Q70", "Q71", "Q72", "Q73", "Q74", "Q75", "Q76", "Q77", "Q78", "Q79", "Q80", "Q81", "Q82", "Q83", "Q84", "Q85", "Q86", "Q87", "Q88", "Q89", "Q90", "Q91", "Q92", "Q93", "Q94", "Q95", "Q96", "Q97", "Q98", "Q99"],
  "Legal Services/Crime Prevention": ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12", "I13", "I14", "I15", "I16", "I17", "I18", "I19", "I20", "I21", "I22", "I23", "I24", "I25", "I26", "I27", "I28", "I29", "I30", "I31", "I32", "I33", "I34", "I35", "I36", "I37", "I38", "I39", "I40", "I41", "I42", "I43", "I44", "I45", "I46", "I47", "I48", "I49", "I50", "I51", "I52", "I53", "I54", "I55", "I56", "I57", "I58", "I59", "I60", "I61", "I62", "I63", "I64", "I65", "I66", "I67", "I68", "I69", "I70", "I71", "I72", "I73", "I74", "I75", "I76", "I77", "I78", "I79", "I80", "I81", "I82", "I83", "I84", "I85", "I86", "I87", "I88", "I89", "I90", "I91", "I92", "I93", "I94", "I95", "I96", "I97", "I98", "I99"],
  "Healthcare": ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20", "E21", "E22", "E23", "E24", "E25", "E26", "E27", "E28", "E29", "E30", "E31", "E32", "E33", "E34", "E35", "E36", "E37", "E38", "E39", "E40", "E41", "E42", "E43", "E44", "E45", "E46", "E47", "E48", "E49", "E50", "E51", "E52", "E53", "E54", "E55", "E56", "E57", "E58", "E59", "E60", "E61", "E62", "E63", "E64", "E65", "E66", "E67", "E68", "E69", "E70", "E71", "E72", "E73", "E74", "E75", "E76", "E77", "E78", "E79", "E80", "E81", "E82", "E83", "E84", "E85", "E86", "E87", "E88", "E89", "E90", "E91", "E92", "E93", "E94", "E95", "E96", "E97", "E98", "E99", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G20", "G21", "G22", "G23", "G24", "G25", "G26", "G27", "G28", "G29", "G30", "G31", "G32", "G33", "G34", "G35", "G36", "G37", "G38", "G39", "G40", "G41", "G42", "G43", "G44", "G45", "G46", "G47", "G48", "G49", "G50", "G51", "G52", "G53", "G54", "G55", "G56", "G57", "G58", "G59", "G60", "G61", "G62", "G63", "G64", "G65", "G66", "G67", "G68", "G69", "G70", "G71", "G72", "G73", "G74", "G75", "G76", "G77", "G78", "G79", "G80", "G81", "G82", "G83", "G84", "G85", "G86", "G87", "G88", "G89", "G90", "G91", "G92", "G93", "G94", "G95", "G96", "G97", "G98", "G99", "H9", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", "H21", "H22", "H23", "H24", "H25", "H26", "H27", "H28", "H29", "H30", "H31", "H32", "H33", "H34", "H35", "H36", "H37", "H38", "H39", "H40", "H41", "H42", "H43", "H44", "H45", "H46", "H47", "H48", "H49", "H50", "H51", "H52", "H53", "H54", "H55", "H56", "H57", "H58", "H59", "H60", "H61", "H62", "H63", "H64", "H65", "H66", "H67", "H68", "H69", "H70", "H71", "H72", "H73", "H74", "H75", "H76", "H77", "H78", "H79", "H80", "H81", "H82", "H83", "H84", "H85", "H86", "H87", "H88", "H89", "H90", "H91", "H92", "H93", "H94", "H95", "H96", "H97", "H98", "H99"],
  "Housing": ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23", "L24", "L25", "L26", "L27", "L28", "L29", "L30", "L31", "L32", "L33", "L34", "L35", "L36", "L37", "L38", "L39", "L40", "L41", "L42", "L43", "L44", "L45", "L46", "L47", "L48", "L49", "L50", "L51", "L52", "L53", "L54", "L55", "L56", "L57", "L58", "L59", "L60", "L61", "L62", "L63", "L64", "L65", "L66", "L67", "L68", "L69", "L70", "L71", "L72", "L73", "L74", "L75", "L76", "L77", "L78", "L79", "L80", "L81", "L82", "L83", "L84", "L85", "L86", "L87", "L88", "L89", "L90", "L91", "L92", "L93", "L94", "L95", "L96", "L97", "L98", "L99"],
  "Science, Technology and Research": ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", "H21", "H22", "H23", "H24", "H25", "H26", "H27", "H28", "H29", "H30", "H31", "H32", "H33", "H34", "H35", "H36", "H37", "H38", "H39", "H40", "H41", "H42", "H43", "H44", "H45", "H46", "H47", "H48", "H49", "H50", "H51", "H52", "H53", "H54", "H55", "H56", "H57", "H58", "H59", "H60", "H61", "H62", "H63", "H64", "H65", "H66", "H67", "H68", "H69", "H70", "H71", "H72", "H73", "H74", "H75", "H76", "H77", "H78", "H79", "H80", "H81", "H82", "H83", "H84", "H85", "H86", "H87", "H88", "H89", "H90", "H91", "H92", "H93", "H94", "H95", "H96", "H97", "H98", "H99", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "U9", "U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "U20", "U21", "U22", "U23", "U24", "U25", "U26", "U27", "U28", "U29", "U30", "U31", "U32", "U33", "U34", "U35", "U36", "U37", "U38", "U39", "U40", "U41", "U42", "U43", "U44", "U45", "U46", "U47", "U48", "U49", "U50", "U51", "U52", "U53", "U54", "U55", "U56", "U57", "U58", "U59", "U60", "U61", "U62", "U63", "U64", "U65", "U66", "U67", "U68", "U69", "U70", "U71", "U72", "U73", "U74", "U75", "U76", "U77", "U78", "U79", "U80", "U81", "U82", "U83", "U84", "U85", "U86", "U87", "U88", "U89", "U90", "U91", "U92", "U93", "U94", "U95", "U96", "U97", "U98", "U99"],
  "Sports and Recreation": ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10", "N11", "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22", "N23", "N24", "N25", "N26", "N27", "N28", "N29", "N30", "N31", "N32", "N33", "N34", "N35", "N36", "N37", "N38", "N39", "N40", "N41", "N42", "N43", "N44", "N45", "N46", "N47", "N48", "N49", "N50", "N51", "N52", "N53", "N54", "N55", "N56", "N57", "N58", "N59", "N60", "N61", "N62", "N63", "N64", "N65", "N66", "N67", "N68", "N69", "N70", "N71", "N72", "N73", "N74", "N75", "N76", "N77", "N78", "N79", "N80", "N81", "N82", "N83", "N84", "N85", "N86", "N87", "N88", "N89", "N90", "N91", "N92", "N93", "N94", "N95", "N96", "N97", "N98", "N99"],
  "Other": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", "M13", "M14", "M15", "M16", "M17", "M18", "M19", "M20", "M21", "M22", "M23", "M24", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "S30", "S31", "S32", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14", "T15", "T16", "T17", "T18", "T19", "T20", "T21", "T22", "T23", "T24", "T25", "T26", "T27", "T28", "T29", "T30", "T31", "T32", "T33", "T34", "T35", "T36", "T37", "T38", "T39", "T40", "T41", "T42", "T43", "T44", "T45", "T46", "T47", "T48", "T49", "T50", "T51", "T52", "T53", "T54", "T55", "T56", "T57", "T58", "T59", "T60", "T61", "T62", "T63", "T64", "T65", "T66", "T67", "T68", "T69", "T70", "T71", "T72", "T73", "T74", "T75", "T76", "T77", "T78", "T79", "T80", "T81", "T82", "T83", "T84", "T85", "T86", "T87", "T88", "T89", "T90", "T91", "T92", "T93", "T94", "T95", "T96", "T97", "T98", "T99", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17", "V18", "V19", "V20", "V21", "V22", "V23", "V24", "V25", "V26", "V27", "V28", "V29", "V30", "V31", "V32", "V33", "V34", "V35", "V36", "V37", "V38", "V39", "V40", "V41", "V42", "V43", "V44", "V45", "V46", "V47", "V48", "V49", "V50", "V51", "V52", "V53", "V54", "V55", "V56", "V57", "V58", "V59", "V60", "V61", "V62", "V63", "V64", "V65", "V66", "V67", "V68", "V69", "V70", "V71", "V72", "V73", "V74", "V75", "V76", "V77", "V78", "V79", "V80", "V81", "V82", "V83", "V84", "V85", "V86", "V87", "V88", "V89", "V90", "V91", "V92", "V93", "V94", "V95", "V96", "V97", "V98", "V99", "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14", "W15", "W16", "W17", "W18", "W19", "W20", "W21", "W22", "W23", "W24", "W25", "W26", "W27", "W28", "W29", "W30", "W31", "W32", "W33", "W34", "W35", "W36", "W37", "W38", "W39", "W40", "W41", "W42", "W43", "W44", "W45", "W46", "W47", "W48", "W49", "W50", "W51", "W52", "W53", "W54", "W55", "W56", "W57", "W58", "W59", "W60", "W61", "W62", "W63", "W64", "W65", "W66", "W67", "W68", "W69", "W70", "W71", "W72", "W73", "W74", "W75", "W76", "W77", "W78", "W79", "W80", "W81", "W82", "W83", "W84", "W85", "W86", "W87", "W88", "W89", "W90", "W91", "W92", "W93", "W94", "W95", "W96", "W97", "W98", "W99", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15", "Y16", "Y17", "Y18", "Y19", "Y20", "Y21", "Y22", "Y23", "Y24", "Y25", "Y26", "Y27", "Y28", "Y29", "Y30", "Y31", "Y32", "Y33", "Y34", "Y35", "Y36", "Y37", "Y38", "Y39", "Y40", "Y41", "Y42", "Y43", "Y44", "Y45", "Y46", "Y47", "Y48", "Y49", "Y50", "Y51", "Y52", "Y53", "Y54", "Y55", "Y56", "Y57", "Y58", "Y59", "Y60", "Y61", "Y62", "Y63", "Y64", "Y65", "Y66", "Y67", "Y68", "Y69", "Y70", "Y71", "Y72", "Y73", "Y74", "Y75", "Y76", "Y77", "Y78", "Y79", "Y80", "Y81", "Y82", "Y83", "Y84", "Y85", "Y86", "Y87", "Y88", "Y89", "Y90", "Y91", "Y92", "Y93", "Y94", "Y95", "Y96", "Y97", "Y98", "Y99"],
  "Religious Affiliated": ["O55", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "X10", "X11", "X12", "X13", "X14", "X15", "X16", "X17", "X18", "X19", "X20", "X21", "X22", "X23", "X24", "X25", "X26", "X27", "X28", "X29", "X30", "X31", "X32", "X33", "X34", "X35", "X36", "X37", "X38", "X39", "X40", "X41", "X42", "X43", "X44", "X45", "X46", "X47", "X48", "X49", "X50", "X51", "X52", "X53", "X54", "X55", "X56", "X57", "X58", "X59", "X60", "X61", "X62", "X63", "X64", "X65", "X66", "X67", "X68", "X69", "X70", "X71", "X72", "X73", "X74", "X75", "X76", "X77", "X78", "X79", "X80", "X81", "X82", "X83", "X84", "X85", "X86", "X87", "X88", "X89", "X90", "X91", "X92", "X93", "X94", "X95", "X96", "X97", "X98", "X99"],
}



MongoClient.connect(url, function(err, db) {
  if(err){
    console.log(err);
    return;
  }
  console.log('Mongo DB connected.');
  mongoMetaDB = db.collection('meta');
  tax2015 = db.collection('tax2015');
  tax2014 = db.collection('tax2014');
  tax2013 = db.collection('tax2013');
  tax2012 = db.collection('tax2012');

})

function mongoSearch(searchValue, limit, cb) {
  mongoMetaDB.find({
    $text: {
      $search: searchValue
    }
  }, {
    score: {
      $meta: "textScore"
    }
  }).sort({
    score: {
      $meta: "textScore"
    }
  }).limit(limit).toArray(function(err, docs) {
    cb(docs);
  });
}



app.get('/typeaheadNames', function(req, res) {
  var q = req.query.q;
  mongoSearch(q, perpage, function(results){
    res.send(results);
  });
})



app.get('/zipCodes', function(req, res) {
  var q = req.query.q;
  var query = {};
  var proj = {};
  try{
    query['ZIP'] = new RegExp("^"+q, "");

    mongoMetaDB.aggregate([{$match: query}, {$group:{_id:"$ZIP", ZIP:{$addToSet:"$ZIP"}}},{$limit:8}]).toArray(function(err, docs) {
      if(err){
        console.log('error', err);
        res.send([]);
        return;
      }
      res.send(docs);
    });
  }catch(e){
    console.log(e);
    res.send([]);
  }
})



app.get('/cityNames', function(req, res) {
  var q = req.query.q;
  var query = {};
  var proj = {};
  try{
    query['CITY'] = new RegExp("^"+q, "i");

    mongoMetaDB.aggregate([{$match: query}, {$group:{_id:"$CITY", CITY:{$addToSet:"$CITY"}}},{$limit:8}]).toArray(function(err, docs) {
      if(err){
        console.log('error', err);
        res.send([]);
        return;
      }
      res.send(docs);
    });
  }catch(e){
    console.log(e);
    res.send([]);
  }
})



app.get('/getSamples', function(req, res) {
  mongoMetaDB.aggregate([{$sample:{size:perpage}}]).toArray(function(err, docs) {
    res.send(docs);
  });
})


app.get('/getTaxByEIN', function(req, res) {
  var y = req.query.y;
  var ein = req.query.ein;
  var coll = null;

  if(y == "2015"){
    coll = tax2015;
  }else if(y == "2014"){
    coll = tax2014;
  }else if(y == "2013"){
    coll = tax2013;
  }else if(y == "2012"){
    coll = tax2012;
  }else{
    res.send("Error, invalid year");
  }

  if(coll){
    coll.find({EIN:ein}).toArray(function(err, docs) {
      if(err){
        console.log('error', err);
        res.send([]);
        return;
      }
      res.send(docs);
    });
  }else{
    res.send("Error, no collection");
  }
})

app.get('/getMetaByEIN', function(req, res) {
  var ein = req.query.ein;

    mongoMetaDB.find({EIN:ein}).toArray(function(err, docs) {
      if(err){
        console.log('error', err);
        res.send([]);
        return;
      }
      res.send(docs);
    });

})

app.get('/getResults', function(req, res) {

  var q = JSON.parse(req.query.q);
  var page = req.query.p;

  var query = {};
  var proj = {};
  var sort = {};

  if(q.name){
    sort['score'] = {
      $meta: 'textScore'
    };

    query['$text'] = {
      $search: q.name
    }

    proj['score'] = {
      $meta: 'textScore'
    }
  }
  if(q.city){
    query['CITY'] = q.zip;
  }
  if(q.state){
    query['STATE'] = q.state;
  }
  if(q.zip){
    query['ZIP'] = q.zip;
  }
  if(q.ntee){
    if(nteeTypes[q.ntee]){
      //console.log(nteeTypes[q.ntee]);
      query['NTEE_CD'] = {
        $in: nteeTypes[q.ntee]
      }
    }
  }
  if(q.sort){
    if(q.sort == "Highest Revenue"){
      sort['REVENUE_AMT'] = -1;
    }
    if(q.sort == "Lowest Revenue"){
      sort['REVENUE_AMT'] = 1;
    }
    if(q.sort == "Highest Assets"){
      sort['ASSET_AMT'] = -1;
    }
    if(q.sort == "Lowest Assets"){
      sort['ASSET_AMT'] = 1;
    }
  }

//console.log(query, sort, proj);

  mongoMetaDB.find(query, proj).sort(sort).skip( (page) * perpage ).limit(perpage).toArray(function(err, docs) {
    if(err){
      console.log('error', err);
      res.send([]);
      return;
    }
    res.send(docs);
  });

})

app.listen(8080);







/*
indexOfSearchWithIndex(q, searchMeta, key, perpage * (page - 1), perpage * (page), function(results) {
  //console.log(results);

  res.send(results);
});
*/



/*
indexOfSearch(q, typeaheadNames, 10, function(results){
  //console.log(results);
  var retObj = [];
  for(var i=0;i<results.length;i++){
    retObj.push({name: results[i]});
  }
  res.send(retObj);
});
*/
/*
fuzzyFilterSearch(q, typeaheadNames, 10, function(results){
  console.log(results);
  var retObj = [];
  for(var i=0;i<results.length;i++){
    retObj.push({name: results[i]});
  }
  res.send(retObj);
});
*/

/*
var fs = require('fs');
var fuzzyFilter = require('fuzzy-filter');
var fuzzy = require('fuzzy');

var typeaheadNames = [];
var searchMeta = [];

fs.readFile('data/names.json', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  typeaheadNames = JSON.parse(data);
})

fs.readFile('data/searchmeta.json', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  searchMeta = JSON.parse(data);
})

function indexOfSearch(searchValue, data, limit, cb) {
  var results = [];
  var q = searchValue.toLowerCase();
  for (var i = 0; i < data.length; i++) {
    var matchwith = data[i].toLowerCase();
    if (matchwith.indexOf(q) !== -1) {
      results.push(data[i]);
      if (results.length >= limit) {
        break;
      }
    }
  }
  //  console.log(results.length);
  cb(results);
}

function indexOfSearchWithIndex(searchValue, data, key, lower, upper, cb) {
  var results = [];
  if (typeof searchValue === 'string') {
    var q = searchValue.toLowerCase();
  } else {
    var q = searchValue;
  }

  for (var i = 0; i < data.length; i++) {
    if (typeof searchValue === 'string') {
      var matchwith = data[i][key].toLowerCase();
    } else {
      var matchwith = data[i][key];
    }
    if (matchwith.indexOf(q) !== -1) {
      results.push(data[i]);
    }
  }
  cb(results.slice(lower, upper));
}

function fuzzyFilterSearch(searchValue, data, limit, cb) {
  var results = fuzzyFilter(searchValue, data);
  //console.log(results.length);
  cb(results.slice(1, limit));
}

function fuzzySearch(searchValue, data, limit, cb) {
  var results = fuzzy.filter(searchValue, data);
  //console.log(results.length);
  cb(results.slice(1, limit));
}
*/
