<?php
if( $_SERVER['REQUEST_URI'] === '/' ) {
	include( 'index.html' );
	die();
}

// Global Variables
define( 'ROOT', $_SERVER['DOCUMENT_ROOT'] );
define( 'REQUEST', parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ) );

function shorthand_bytes( $bytes )
{
	if( $bytes >= 1073741824 )
	{
		$bytes = number_format( $bytes / 1073741824, 2 ) . ' GB';
	}
	elseif( $bytes >= 1048576 )
	{
		$bytes = number_format( $bytes / 1048576, 2 ) . ' MB';
	}
	elseif( $bytes >= 1024 )
	{
		$bytes = number_format( $bytes / 1024, 2 ) . ' KB';
	}
	elseif( $bytes > 1 )
	{
		$bytes = $bytes . ' bytes';
	}
	elseif( $bytes == 1 )
	{
		$bytes = $bytes . ' byte';
	}
	else
	{
		$bytes = '0 bytes';
	}

	return $bytes;
}

$directory_items = array( );
$current_directory = opendir( ROOT . REQUEST );
while( $item = readdir( $current_directory ) )
{
	$directory_items[ ] = $item;
}
closedir( $current_directory );

$files = array( );
for( $i = 0; $i < count( $directory_items ); $i++ )
{
	$file = array( );
	$file['NAME'] = $directory_items[ $i ];

	// Skip hidden system files (i.e. ., .., .htaccess, .DS_STORE)
	if( $file['NAME'][0] === '.' )
	{
		unset( $files[$i] );
		continue;
	}

	// Get file information
	$file['PATH'] = REQUEST;
	$file['TIMESTAMP'] = filemtime( ROOT . $file['PATH'] . $file['NAME'] );
	$file['DATE'] = date( 'M j Y g:i A', $file['TIMESTAMP'] );

	if( is_dir( ROOT . $file['PATH'] . $file['NAME'] ) )
	{
		// Handle directories
		$file['BYTES'] = -1;
		$file['EXTENSION'] = '';
		$file['TYPE'] = 'FILE_TYPE_DIRECTORY';
		$file['SIZE'] = $file['TYPE'];
	}
	else
	{
		// Handle files
		$file['EXTENSION'] = pathinfo( $file['NAME'], PATHINFO_EXTENSION );

		// Classify file type
		switch( $file['EXTENSION'] )
		{
			case 'css'  : $file['TYPE'] = 'FILE_TYPE_STYLESHEET'; break;
			case 'html' : $file['TYPE'] = 'FILE_TYPE_HTML'; break;
			case 'ico'  : $file['TYPE'] = 'FILE_TYPE_ICON_WIN'; break;
			case 'icns' : $file['TYPE'] = 'FILE_TYPE_ICON_MAC'; break;
			case 'jpg'  : $file['TYPE'] = 'FILE_TYPE_JPEG'; break;
			case 'js'   : $file['TYPE'] = 'FILE_TYPE_JAVASCRIPT'; break;
			case 'json' : $file['TYPE'] = 'FILE_TYPE_JSON'; break;
			case 'map'  : $file['TYPE'] = 'FILE_TYPE_MAP'; break;
			case 'md'   : $file['TYPE'] = 'FILE_TYPE_MARKDOWN'; break;
			case 'mp3'  : $file['TYPE'] = 'FILE_TYPE_AUDIO'; break;
			case 'php'  : $file['TYPE'] = 'FILE_TYPE_PHP'; break;
			case 'png'  : $file['TYPE'] = 'FILE_TYPE_PNG'; break;
			case 'scss' : $file['TYPE'] = 'FILE_TYPE_SASS'; break;
			case 'ttf'  : $file['TYPE'] = 'FILE_TYPE_FONT'; break;
			
			default:
				if( $file['TYPE'] != '' )
				{
					$file['TYPE'] = '{{ FILE_TYPE_KNOWN }}';
				}
				else
				{
					$file['TYPE'] = '{{ FILE_UNKNOWN }}';
				}
			break;
		}

		$file['BYTES'] = filesize( ROOT . $file['PATH'] . $file['NAME'] );
		$file['SIZE'] = shorthand_bytes( $file['BYTES'] );
	}

	$files[ ] = $file;
}

usort( $files, function( $a, $b )
{
	switch( $_GET['C'] )
	{
		case 'M' :
			if( $a['TIMESTAMP'] !== $b['TIMESTAMP'] )
			{
				return ( $a['TIMESTAMP'] > $b['TIMESTAMP'] ) ? 1 : -1;
			}
		break;
		
		case 'S' :
			if( $a['BYTES'] !== $b['BYTES'] )
			{
				return ( $a['BYTES'] > $b['BYTES'] ) ? 1 : -1;
			}
		break;
		
		case 'D' : return strcmp( $a['EXTENSION'], $b['EXTENSION'] ); break;
		default  : return strcmp( $a['NAME'], $b['NAME'] ); break;
	}

	return 0;
} );

if( $_GET['0'] === 'D' )
{
	$files = array_reverse( $files );
}

$template_variables = array(
	'DIRECTORY' => REQUEST,
	'FILES' => $files,
	'FILE_NAME_SORT' => ( $_GET['C'] === 'N' && $_GET[0] === 'A' ) ? 'D' : 'A',
	'FILE_TYPE_SORT' => ( $_GET['C'] === 'D' && $_GET[0] === 'A' ) ? 'D' : 'A',
	'FILE_SIZE_SORT' => ( $_GET['C'] === 'S' && $_GET[0] === 'A' ) ? 'D' : 'A',
	'FILE_DATE_SORT' => ( $_GET['C'] === 'M' && $_GET[0] === 'A' ) ? 'D' : 'A'
);

include_once( 'templates/listing.html' );
?>
