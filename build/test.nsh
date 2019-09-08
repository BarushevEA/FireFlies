#!include nsDialogs.nsh

!macro MUI_FUNCTION_TEST
#!insertmacro MUI_PAGE_INIT

; handle variables
Var hCtl_test
Var hCtl_test_CheckBox1
Var hCtl_test_Button1
Var my_link
Var my_Text

  #Function "${SHOW}"
    PageEx custom

    PageCallbacks fnc_test_Show
    PageExEnd
  #FunctionEnd

; dialog create function
Function fnc_test_Create

  ; === test (type: Dialog) ===
  #System::Call 'user32::SetWindowPos(i$hwndparent,i,i,i,i800,i600,i 0x16)'
  nsDialogs::Create 1044

  Pop $hCtl_test
  ${If} $hCtl_test == error
    Abort
  ${EndIf}

  SetCtlColors $hCtl_test 0x000000 0xFAF0E6
  #System::Call 'user32::MoveWindow(i$hCtl_test,i50,i100,i700,i400,i0)' ; Resize inner (nsDialogs) page


  !insertmacro MUI_HEADER_TEXT "Dialog title..." "Dialog subtitle..."

  ; === CheckBox1 (type: Checkbox) ===
  ${NSD_CreateCheckbox} 26.99u 73.85u 101.37u 20.31u "CheckBox1"
  Pop $hCtl_test_CheckBox1
  SetCtlColors $hCtl_test_CheckBox1 0x000000 0xFAF0E6

  #${NSD_CreateLabel} 0u 110u 100% 50u "$(freshInstallForCurrent)"
  ${NSD_CreateLink} 0u 20u 20% 14u "SHOW GOOGLE !!!"
  Pop $my_link
  SetCtlColors $my_link 0x3e59ff 0xFAF0E6

  ${NSD_OnClick} $my_link onMyLinkClick
  ${NSD_CreateLabel} 0u 0u 100% 14u "$INSTDIR"
  Pop $my_Text
  ; === Button1 (type: Button) ===
  ${NSD_CreateButton} 26.99u 40u 74.38u 19.08u "Button1"
  Pop $hCtl_test_Button1
  ${NSD_OnClick} $hCtl_test_Button1 onBtnClick
  SetCtlColors $hCtl_test_Button1 0x000000 0xFAF0E6
  ${NSD_OnClick} $my_Text onBtnClick

   ${NSD_CreateDirRequest} 26.99u 120u 74.38u 19.08u "NSD_CreateDirRequest"

  SetCtlColors $hCtl_test_Button1 0x000000 0xFAF0E6
FunctionEnd

; dialog show function
Function fnc_test_Show
  Call fnc_test_Create

  nsDialogs::Show
FunctionEnd

Function onMyLinkClick
    Pop $0
    ExecShell "open" "https://www.google.com.ua/"
FunctionEnd

Function onBtnClick
    Call showPath
FunctionEnd


Function showPath
    nsDialogs::SelectFolderDialog "Select Directory" $DOCUMENTS
    Pop $0
    ${If} $0 != "error"
    StrCpy $INSTDIR $0
    ${EndIf}

    #MessageBox MB_OK "$PLUGINSDIR"
    #MessageBox MB_OK "$WINDIR"
    #MessageBox MB_OK "$OUTDIR"
    #MessageBox MB_OK "$SYSDIR"
    #MessageBox MB_OK "$DOCUMENTS"

    ${NSD_SetText} $my_Text $INSTDIR
FunctionEnd

!macroend

!insertmacro MUI_FUNCTION_TEST
